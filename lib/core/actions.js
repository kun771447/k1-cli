const path = require('path');
const { promisify } = require('util');
const download = promisify(require('download-git-repo'));

const { repo } = require('../config/repo-config');
const { commandSpawn, compile, writeToFile } = require('../utils');

const createProjectAction = async (project) => {
  console.log('create your project~');
  try {
    // 克隆项目
    await download(repo, project, { clone: true });
    // 安装依赖 执行 npm install
    const command = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    await commandSpawn(command, ['install'], { cwd: `./${project}` });
    // 运行
    await commandSpawn(command, ['run', 'serve'], { cwd: `./${project}` });
    // 自动打开浏览器 open
  } catch(error) {
    console.log(error);
  } 
}

// 添加组件的 action
const addComponentAction = async (name, filePath) => {
  try {
    // 编译 ejs 模版 result
    const result = await compile('react-component.ejs', {
      name: name
    });
    // 将 result 写入对应的文件夹的文件中
    const targetPath = path.resolve(filePath, `${name}.tsx`);
    writeToFile(targetPath, result);
  } catch(error) {
    console.log(error);
  }
}

module.exports = {
  createProjectAction,
  addComponentAction
}
