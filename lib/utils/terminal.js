// 执行终命令相关的代码

const { spawn } = require('child_process');

// 执行 npm install
const commandSpawn = (...args) => {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(...args);
    // 打印执行信息
    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);
    childProcess.on('close', () =>{
      resolve();
    });
  });
}

module.exports = {
  commandSpawn
}