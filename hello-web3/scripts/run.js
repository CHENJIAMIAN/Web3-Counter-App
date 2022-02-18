const main = async () => {
    const Counter = await hre.ethers.getContractFactory('Counter');
    const counter = await Counter.deploy();
    await counter.deployed();

    console.log(`Counter deployed at ${counter.address}`);

    let counts = await counter.getCounts();
    console.log(`Current counts (1): ${counts}`);

    await counter.add();
    counts = await counter.getCounts();
    console.log(`Current counts (2): ${counts}`);

    await counter.add();
    counts = await counter.getCounts();
    console.log(`Current counts (3): ${counts}`);
};
 
main()
    .then(() => {
        console.log(`success`);
        process.exit(0);
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });


    // npx hardhat node #运行测试网
    // 会列出20个用于测试的真实账户,这些真实账户在本地测试网里有1w个测试的ETH用于支付汽油费
    // 通过给的私钥导入MetaMask钱包
    // 钱包设置网络,切换到本地测试网,ChainId从1337改为31337,才能连上

    // npx hardhat run scripts/run.js --network localhost #将合约部署到本地测试网