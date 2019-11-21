const path = require('path')
const fs = require('fs')
const pathFinder = require('react-autodocs-utils/src/path-finder');
const parse = require('react-autodocs-utils/src/parser/parse');
const visit = require('react-autodocs-utils/src/parser/visit');
const types = require('@babel/types');
const {safeParse, StylableProcessor, processNamespace} = require('@stylable/core')

const parseStylable = source =>
  new StylableProcessor(undefined, processNamespace).process(safeParse(source)).rawAst

const getImportedStylablePath = ast => new Promise(resolve => {
  visit(ast)({
    enter(path) {
      if (types.isImportDeclaration(path.node)) {
        const source = path.node.source.value

        if (source.endsWith('.st.css')) {
          resolve(source)
          path.stop()
        }
      }
    }
  })

  resolve(null)
})

const extractStylableVarStructure = ast =>
  [].concat.apply(
    [],
    ast.nodes.filter(node =>
      node.type == 'rule' && node.selector == ':vars'
    ).map(node => node.nodes)
  )

const getAllStylableVars = ast => {
  const varStructure = extractStylableVarStructure(ast)

  const vars = {}
  let comment = ''

  varStructure.forEach(node => {
    if (node.type === 'comment') {
      comment = node.text
    } else if (node.type === 'decl') {
      vars[node.prop] = {
        value: node.value,
        comment,
      }

      comment = ''
    }
  })

  return vars
}

const getDefaultValue = (name, allVars) => {
  const defaultVarEntry = Object.entries(allVars).find(
    ([testName]) => testName === `Default${name}`
  )

  if (!defaultVarEntry) {
    return ''
  }

  const [,info] = defaultVarEntry

  return info.value
}

const guessVarType = (name, value, defaultValue) => {
  const colorRegexp = /color/i

  const colorRules = [
    () => name.match(colorRegexp),
    () => value.match(colorRegexp),
    () => defaultValue.match(colorRegexp)
  ]

  const fontRegexp = /font/i
  const fontGuessRegexp = /[^A-Za-z_-]theme\:/
  
  const fontRules = [
    () => name.match(fontRegexp),
    () => value.match(fontRegexp),
    () => defaultValue.match(fontRegexp),
    () => defaultValue.match(fontGuessRegexp),
  ]

  const succeedingRule = rule => Boolean(rule())

  if (colorRules.find(succeedingRule)) {
    return 'color';
  } else if (fontRules.find(succeedingRule)) {
    return 'font'
  } else {
    return 'number'
  }
}

const parseComment = comment => {
  if (!comment) {
    return {
      description: '',
    }
  }

  const supportedTags = ['type', 'default', 'min', 'max', 'unit']
  const commentParts = comment.split('@').map(part => part.trim())

  const description = commentParts.shift()

  const result = {description}

  commentParts.forEach(part => {
    for (const supportedTag of supportedTags) {
      if (part.startsWith(`${supportedTag} `)) {
        result[supportedTag] = part.substring(supportedTag.length + 1)
      }
    }
  })

  return result
}

const getOverridableVars = ast => {
  const allVars = getAllStylableVars(ast)
  const vars = []

  Object.entries(allVars).forEach(([name, info]) => {
    if (info.value.startsWith('-')) {
      const defaultValue = getDefaultValue(name, allVars)
      const commentInfo = parseComment(info.comment)

      vars.push({
        name,
        type: commentInfo.type || guessVarType(name, info.value, defaultValue),
        defaultValue: commentInfo.default || defaultValue,
        description: commentInfo.description
      })
    }
  })

  return vars
}

module.exports = async function ({source, metadata, basePath}) {
  const relativeComponentPath = await pathFinder(source)
  const absoluteComponentPath = path.resolve(basePath, relativeComponentPath)

  const componentSource = fs.readFileSync(absoluteComponentPath, {encoding: 'utf8'})
  const componentAst = parse(componentSource)

  const relativeStylablePath = await getImportedStylablePath(componentAst)

  if (!relativeStylablePath) {
    return {metadata}
  }

  const absoluteStylablePath = path.resolve(path.dirname(absoluteComponentPath), relativeStylablePath)

  const stylableSource = fs.readFileSync(absoluteStylablePath, {encoding: 'utf8'})
  const stylableAst = parseStylable(stylableSource)

  return {
    metadata: {
      ...metadata,
      stylable: {
        overridableVars: getOverridableVars(stylableAst)
      }
    }
  }
}