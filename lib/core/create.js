const program = require('commander');
// 获取参数对象

const {
  createProjectAction,
  addComponentAction
} = require('./actions');

const createCommands = () => {
  program
    .command('create <project> [others...]')
    .description('克隆仓库到某个文件夹')
    .action(createProjectAction);
  
  program
    .command('addcpn <name>')
    .description('添加组件, 例如：k1 addCpn HelloWorld -d src/components')
    .action((name) => {
      // 获取参数对象
      const options = program.opts();
      const path = options.path;
      addComponentAction(name, path || 'src/components');
    });
}

module.exports = {
  createCommands
}