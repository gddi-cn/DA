const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const safePostCssParser = require('postcss-safe-parser');

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

module.exports = {
  devtool: shouldUseSourceMap ? 'source-map' : false,
  output: {
    // bundle
    filename: 'static/js/bundle.js',
    // 块
    chunkFilename: 'static/js/[name].chunk.js',
    devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
  },
  optimization: {
    minimize: true,
    minimizer: [
      // This is only used in production mode
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            // 传递2015或更大以启用compress将 ES5 代码转换为更小的 ES6+ 等效形式的选项。
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            // true绕过 Safari 10 循环迭代器错误 “无法两次声明 let 变量”。
            safari10: true,
          },

          // keep_classnames(默认: false) -- 通过true以防止压缩器丢弃类名。传递正则表达式以仅保留与该正则表达式匹配的类名
          //   keep_classnames: undefined,
          // keep_fargs(default: true) -- 防止压缩器丢弃未使用的函数参数。对于依赖于Function.length.
          //   keep_fnames: false,
          output: {
            ecma: 5,
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true,
          },
        },
        sourceMap: shouldUseSourceMap,
      }),
      // This is only used in production mode
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: safePostCssParser,
          map: shouldUseSourceMap
            ? {
              // `inline: false` forces the sourcemap to be output into a
              // separate file
              inline: false,
              // `annotation: true` appends the sourceMappingURL to the end of
              // the css file, helping the browser find the sourcemap
              annotation: true,
            }
            : false,
        },
        cssProcessorPluginOptions: {
          preset: ['default', { minifyFontValues: { removeQuotes: false } }],
        },
      }),
    ],

    splitChunks: {
      chunks: 'all',
      name: false,
    },
    // Keep the runtime chunk separated to enable long term caching
    // https://twitter.com/wSokra/status/969679223278505985
    // https://github.com/facebook/create-react-app/issues/5358
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`,
    },
  },

  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),

  ]

};
