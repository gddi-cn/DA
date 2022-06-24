// 暗色调的对象
// 要符合less的标准、变量都是驼峰
const gddi_design = {
  // GDDI设计参数

}

const ant_design = {
  // antd的设计参数
  primaryColor: '#FF6177',
  'link-color': '#1DA57A',
  'border-radius-base': '2px',
}

const all_design = {
  ...gddi_design, ...ant_design
};

module.exports = all_design
