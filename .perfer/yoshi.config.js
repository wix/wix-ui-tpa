const path = require('path');

const ROOT_DIR = process.cwd();
const resolvePath = (...args) => path.resolve(ROOT_DIR, ...args);

// TODO: import the full list from components.json
// const componentsToBundle = require(resolvePath('../.wuf/components.json'));
const componentsToBundle = {
  Spinner: { path: 'src/components/Spinner' },
};

const components = Object.keys(componentsToBundle).reduce(
  (accu, component) => ({
    ...accu,
    [component]: `${componentsToBundle[component].path.replace(
      'src/',
      '../../dist/es/src/'
    )}/index`,
  }),
  {}
);

module.exports = {
  entry: {
    ...components,
  },
  externals: {
    react: 'react',
    'react-dom': 'reactDOM',
    'prop-types': 'propTypes',
    'react-is': 'react-is',
  },
};
