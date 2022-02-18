# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```


hardhat搭建的合约代码

```js
// npx hardhat node #运行测试网
// 会列出20个用于测试的真实账户,这些真实账户在本地测试网里有1w个测试的ETH用于支付汽油费
// 通过给的私钥导入MetaMask钱包
// 钱包设置网络,切换到本地测试网,ChainId从1337改为31337,才能连上

// npx hardhat run scripts/run.js --network localhost #将合约部署到本地测试网
```
