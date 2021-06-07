const postcssNormalize = require('postcss-normalize');
// hideNothingWarning: true
// 开发时貌似默认不搞这个，所以会警告，禁止就行了
module.exports = {
  sourceMap: false,
  plugins: () => [
    require('postcss-flexbugs-fixes'),
    require('postcss-preset-env')({
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
    }),
    postcssNormalize(),
  ],
  hideNothingWarning: true
}
