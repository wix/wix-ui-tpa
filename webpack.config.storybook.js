const merge = require('lodash/merge');
const path = require('path');
const wixStorybookConfig = require('yoshi/config/webpack.config.storybook');
const StylableWebpackPlugin = require('@stylable/webpack-plugin');
const project = require('yoshi-config');
const { resolveNamespaceFactory } = require('@stylable/node');
const autoprefixer = require('autoprefixer')({ grid: true, overrideBrowserslist: ['>1%'] });
const postcss = require('postcss');
const autoprefixProcessor = postcss([autoprefixer]);

//TODO - this should be configured inside yoshi
function reconfigureStylable(config) {
    const stylablePlugin = new StylableWebpackPlugin({
        outputCSS: false,
        filename: '[name].stylable.bundle.css',
        includeCSSInJS: true,
        optimize: { classNameOptimizations: false, shortNamespaces: false },
        runtimeMode: 'shared',
        globalRuntimeId: '__stylable_yoshi__',
        generate: {
            runtimeStylesheetId: 'namespace',
        },
        resolveNamespace: resolveNamespaceFactory(project.name),
        transformHooks: {
            postProcessor: (stylableResult) => {
                autoprefixProcessor.process(stylableResult.meta.outputAst).sync();
                return stylableResult;
            }
        }
    });

    //remove previous stylable config and attach new one
    config.plugins.pop();
    config.plugins.push(stylablePlugin);

    return config;
}

module.exports = ({config}) => {
    const newConfig = reconfigureStylable(wixStorybookConfig(config));

    return merge(newConfig, {
        context: path.resolve(__dirname, './src/components'),
        resolve: {
            alias: {
                'wix-ui-tpa': path.resolve(__dirname, './src/components')
            },
        },
        module: {
            rules: newConfig.module.rules.concat({
                test: /\.story\.[j|t]sx?$/,
                loader: 'wix-storybook-utils/loader',

                options: {
                    storyConfig: {
                        moduleName: 'wix-ui-tpa',
                        repoBaseURL: 'https://github.com/wix/wix-ui-tpa/tree/master/src/components/',
                        importFormat: "import {%componentName} from '%moduleName/%componentName'",
                        issueURL: "https://github.com/wix/wix-ui-tpa/issues/new"
                    }
                }
            })
        }
    });
};
