const paths = require('./config-utils/path');
const getClientEnvironment = require('./config-utils/env');
const fs = require('fs');
const path = require('path')
const webpack = require('webpack');
const modules = require('./config-utils/modules');
const PnpWebpackPlugin = require('pnp-webpack-plugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
// const appPackageJson = require(paths.appPackageJson);
const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));

const useTypeScript = fs.existsSync(paths.appTsConfig);
const reactRefreshOverlayEntry = require.resolve(
  'react-dev-utils/refreshOverlayInterop'
);

const babelrc = fs.readFileSync(paths.appBabelrc);
const babelOptions = JSON.parse(babelrc);

// const cssRegex = /\.css$/;

module.exports = function (webpackEnv) {
  const isEnvProduction = webpackEnv === 'production';
  babelOptions.cacheDirectory = true;
  babelOptions.cacheCompression = false;
  babelOptions.compact = isEnvProduction;
  return {
    entry: [
      '@babel/polyfill',
      paths.appIndexJs,
    ],
    output: {
      pathinfo: true,
      publicPath: paths.publicUrlOrPath,
      // jsonpFunction: `webpackJsonp${appPackageJson.name}`,
      globalObject: 'this',
    },

    resolve: {
      extensions: paths.moduleFileExtensions
        .map(ext => `.${ext}`)
        .filter(ext => useTypeScript || !ext.includes('ts')),

      modules: ['node_modules', paths.appNodeModules].concat(
        modules.additionalModulePaths || []
      ),
      plugins: [
        // Adds support for installing with Plug'n'Play, leading to faster installs and adding
        // guards against forgotten dependencies and such.
        PnpWebpackPlugin,
        // 就是为了防止用户引入src目录之外的文件导致不可预期的结果。因为babel都是通过src目录内文件进行入口转义的
        new ModuleScopePlugin(paths.appSrc, [
          paths.appPackageJson,
          reactRefreshOverlayEntry,
        ]),

      ],
    },
    module: {
      strictExportPresence: true,
      rules: [
        { parser: { requireEnsure: false } },
        {
          oneOf: [
            {
              test: /\.(js|mjs|jsx|ts|tsx)$/,
              include: paths.appSrc,
              loader: require.resolve('babel-loader'),
              options: babelOptions,
            },
            {
              test: [/\.avif$/],
              loader: require.resolve('url-loader'),
              options: {
                limit: '10000',
                mimetype: 'image/avif',
                name: 'static/media/[name].[hash:8].[ext]',
              },
            },
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              loader: require.resolve('url-loader'),
              options: {
                limit: '10000',
                name: 'static/media/[name].[hash:8].[ext]',
              },
            },
            {
              loader: require.resolve('file-loader'),
              exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              options: {
                name: 'static/media/[name].[hash:8].[ext]',
              },
            },
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: paths.appHtml,
          },
          isEnvProduction
            ? {
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
              },
            }
            : undefined
        )
      ),
      new WebpackManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: paths.publicUrlOrPath,
        generate: (seed, files, entrypoints) => {
          const manifestFiles = files.reduce((manifest, file) => {
            manifest[file.name] = file.path;
            return manifest;
          }, seed);
          const entrypointFiles = entrypoints.main.filter(
            fileName => !fileName.endsWith('.map')
          );

          return {
            files: manifestFiles,
            entrypoints: entrypointFiles,
          };
        },
      }),
      new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
      new webpack.DefinePlugin(env.stringified),
      new ESLintPlugin({
        // Plugin options
        extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
        formatter: require.resolve('react-dev-utils/eslintFormatter'),
        eslintPath: require.resolve('eslint'),
        failOnError: true,
        context: paths.appSrc,
        cache: true,
        cacheLocation: path.resolve(
          paths.appNodeModules,
          '.cache/.eslintcache'
        ),
        // ESLint class options
        cwd: paths.appPath,
        resolvePluginsRelativeTo: __dirname,
        baseConfig: {
          extends: [paths.appEslintlrc],
        },
      }),
    ]
  };
}
