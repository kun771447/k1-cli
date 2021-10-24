const program = require('commander');

const helpOptions = () => {
  program.option('-p --path <path>', 'a destination folder, 例如：-p /src/components');
  program.option('-f --framework <framework>', 'your framework');
}

module.exports = {
  helpOptions
};
