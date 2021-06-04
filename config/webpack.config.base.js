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

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

const useTypeScript = fs.existsSync(paths.appTsConfig);

const reactRefreshOverlayEntry = require.resolve(
  'react-dev-utils/refreshOverlayInterop'
);

const babelrc = fs.readFileSync(paths.appBabelrc);
const babelOptions = JSON.parse(babelrc);

// const cssRegex = /\.css$/;

module.exports = function (webpackEnv) {
  const isEnvProduction = webpackEnv === 'production';
  const isEnvDevelopment = webpackEnv === 'development';
  babelOptions.cacheDirectory = true;
  babelOptions.cacheCompression = false;
  babelOptions.compact = isEnvProduction;

  const CSS_MODULE_LOCAL_IDENT_NAME = '[local]___[hash:base64:5]';

  babelOptions.plugins.push(
    // babel-plugin-react-css-modules
    // 这个库太久没人维护了，用的第三方库去生成hash的，css-loader是自己搞的函数，所以不一致。用这个应该没毛病。
    [
      '@dr.pogodin/babel-plugin-react-css-modules',
      {

        filetypes: {
          '.less': {
            syntax: 'postcss-less',
          }
        },
        generateScopedName: CSS_MODULE_LOCAL_IDENT_NAME,

      }
    ]
  );

  const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
      isEnvDevelopment && require.resolve('style-loader'),
      isEnvProduction && {
        loader: MiniCssExtractPlugin.loader,
        options: paths.publicUrlOrPath.startsWith('.')
          ? { publicPath: '../../' }
          : {},
      },
      {
        loader: require.resolve('css-loader'),
        options: cssOptions,
      },
      {
        loader: require.resolve('postcss-loader'),
      },
    ].filter(Boolean);
    if (preProcessor) {
      loaders.push(
        {
          loader: require.resolve('resolve-url-loader'),
          options: {
            sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
            root: paths.appSrc,
          },
        },
        {
          loader: require.resolve(preProcessor),
          options: {
            sourceMap: true,
            lessOptions: {
              javascriptEnabled: true
            }
          },
        }
      );
    }
    return loaders;
  };

  return {
    // context: paths.appPath,
    entry: [
      '@babel/polyfill',
      paths.appIndexJs,
    ],
    output: {
      pathinfo: true,
      publicPath: paths.publicUrlOrPath,
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
            // css 就不搞模块化了吧，没这个必要？
            {
              test: /\.css$/,
              use: getStyleLoaders({
                importLoaders: 1,
                sourceMap: isEnvProduction
                  ? shouldUseSourceMap
                  : isEnvDevelopment,
              }),
              sideEffects: true,
            },
            {
              test: /\.less$/,
              include: paths.appSrc,
              use: getStyleLoaders(
                {
                  importLoaders: 3,
                  sourceMap: isEnvProduction
                    ? shouldUseSourceMap
                    : isEnvDevelopment,
                  modules: {
                    localIdentName: CSS_MODULE_LOCAL_IDENT_NAME,
                  },
                },
                'less-loader'
              ),
            },
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
