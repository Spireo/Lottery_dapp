const Web3 = require('web3')
const {interface,bytecode} = require ('./compile1')
const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonicPhrase = "tool safe ill nominee bag tooth curtain prosper hurry vital bird say"; // 12 word mnemonic
const provider = new HDWalletProvider({
    mnemonic: {
        phrase: mnemonicPhrase
    },
    providerOrUrl: "https://rinkeby.infura.io/v3/a6ee2a79055d4a73ade8af50a6d46ce1"
});
const web3 = new Web3(provider)

deploy = async ()=>{
    process.on('unhandledRejection', error => {
        console.error('unhandledRejection', error);
        process.exit(1) // To exit with a 'failure' code
    });
    const accounts =  await web3.eth.getAccounts();
    console.log(accounts[0])
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data:bytecode,
            arguments:['abc'],
        }).send({
            from:accounts[0],
            gas:1000000,
        });
    console.log('address:'+result.options.address);
    console.log('--------------------');
    console.log(interface);
}

deploy();