const { rejects } = require('assert');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

const compile = (templateName, data) => {
  const templatePosition = `../templates/${templateName}`;
  const templatePath = path.resolve(__dirname, templatePosition);
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, data, {}, (err, result) => {
      if(err) {
        console.log(err);
        reject(err);
        return;
      }
      resolve(result); 
    });
  })
}

const createDirSync = (pathName) => {
  // 判断当前路径存不存在，存在直接 return
  if(fs.existsSync(pathName)) {
    return true;
  }
  // 判断父路径是否存在
  if(createDirSync(path.dirname(pathName))) {
    // 创建文件夹
    fs.mkdirSync(pathName);
    return true;
  } 
}

const writeToFile = (pathName, content) => {
  if(!createDirSync(path.dirname(pathName))) {
    return;
  }
  return fs.promises.writeFile(pathName, content);
}

module.exports =  {
  compile,
  writeToFile 
} 