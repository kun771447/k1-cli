## 如何让指令生效

```js
npm init -y
```

```js
// #! 读音 sheibang 或者 ha sh 
#! 配置环境
当你执行某一个命令，找到这个文件，会根据找到配置的环境，来执行这个文件
```

```js
// 在当前这环境去找寻找 node 这个可执行文件，根据这个可执行文件再来来执行这个文件
#! /usr/bin/env node
```

- 在 package.json 中告诉它要运行什么命令
  ```js
  "bin": {
      "why": "index.js"
    },
  ```
```js
npm i commander
```

```js
#!/usr/bin/env node
const program = require('commander');
program.version(require('./package.json').version);
// program.version(require('./package.json').version, '-v, --version'); // 这会取代掉 -V

// 添加自己的 options
program.option('-w --why', 'a why cli');
program.option('-d --dest <dest>', 'a destination folder, 例如：-d /src/components');
program.option('-f --framework <framework>', 'your framework');
program.option('--variadic [variadic]', 'variadic option');

// console.log("why cli");
// 监听某个指令的执行
program.on('--help', function() {
  console.log("");
  console.log("Other:");
  console.log("  other options~")  
});

program.parse(process.argv);

// 获取参数对象
const options = program.opts();
console.log(options.dest);
```

- 创建其他指令

```js
const createCommands = () => {
  program
    .command('create <project> [others...]')
    .description('指令描述')
    .action((project, others) => {
      console.log(project, others);
    })
}
```

- 克隆项目
```js
npm i download-git-repo
```

```js
// 将回调函数转换成 promise 的形式
const { promisify } = require('util');
const download = promisify(require('download-git-repo')); 

download().then().catch();
```

- 执行 npm i

```js
// 执行终命令相关的代码

const { spawn } = require('child_process');

const commandSpawn = (...args) => {
  return Promise((resolve, reject) => {
    const childProcess = spawn(...args);
    // 打印执行信息
    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);
    childProcess.on('close', () =>{
      resolve();
    });
  });
}
```

```js
// 在 windows 系统实际是执行的 npm.cwd
const command = process.platform === 'win32' ? 'npm.cmd' : 'npm';
await commandSpawn('npm', ['install'], {cwd: `./${project}`});
```

```js
which npm
查看 npm 执行的是什么命令
```

- 打开浏览器

```js
const open = require('open');
open("http://localhost:8080/");
```

- 添加组件，创建对应的 ejs 模版，编译 ejs 模版