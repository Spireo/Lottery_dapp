//编译智能合约的脚本
const path = require('path');
const fs = require('fs');
const solc = require('solc');    //导入编译器

const srcpath = path.resolve(__dirname,'contracts','Lottery.sol');
console.log(srcpath);

const source = fs.readFileSync(srcpath,'utf-8');

const result = solc.compile(source,1);


module.exports = result.contracts[':Lottery']; //此处语句是？

