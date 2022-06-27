// 暗色调的对象
// 要符合less的标准、变量都是驼峰
const gddi_design = {
  // GDDI设计参数
  // 第二颜色
  'secondary-color': '#A2F6C5',

  // 标题
  'primary-title-color': '#FAFAFA',
  'secondary-title-color': '#FAFAFA',
  'small-title-color': '#F0F0F0',

  // 正文
  'primary-text_color': '#F0F0F0',
  'auxiliary-text_color': '#BFBFBF',
  'unactive-text_color': '#595959',

  // 链接颜色
  'link-color': '#2B57D6',

  // 状态颜色
  'success-color': '#49AA19',
  'warning-color': '#D89614',
  'error-color': '#A61D24',
}

const ant_design = {
  // antd的设计参数
  primaryColor: '#FF6177',
}

const all_design = {
  gddi_design, ant_design
};

module.exports = all_design
