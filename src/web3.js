import Web3 from 'web3';
const web3 = new Web3(window.web3.currentProvider); //在此处要加上.enable()然后在连接完成之后再去掉
export default web3;