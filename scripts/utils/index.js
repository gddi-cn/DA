const chalk = require('chalk');

const error = msg => {
  console.log(chalk.bold.red(msg))
  process.exit(1);
};
const warning = msg => console.log(chalk.keyword('orange')(msg));
const success = msg => console.log(chalk.bold.green(msg));
const info = msg => console.log(msg);
const hr = () => info('---------------------------')

const utils = {
  error,
  warning,
  success,
  info,
  hr
}

module.exports = utils;
