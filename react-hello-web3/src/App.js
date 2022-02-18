import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import abi from './utils/Counter.json';

//hello-web3
const contractAddress = '0x5fc8d32690cc91d4c39d9d3abcbd16989f875707';
const contractABI = abi.abi;

function App() {
    const [count, setCount] = useState(0);
    const [account, setAccount] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const checkIfWalletIsConnected = async () => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                console.log('metamask is connected');
            } else {
                console.log('please install metamask');
            }

            const accounts = await ethereum.request({ method: 'eth_accounts' });

            if (accounts.length !== 0) {
                const account = accounts[0];
                console.log('found account with address', account);
                setAccount(account);
            } else {
                console.log('no accounts found');
            }
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        checkIfWalletIsConnected().then(() => {
            getCounts();
        });
    }, []);

    const handleConnectWallet = async () => {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                alert('please install metamask');
                return false;
            }
            const accounts = await ethereum.request({
                method: 'eth_requestAccounts',
            });
            console.log(accounts[0].address);
            setAccount(accounts[0]);
        } catch (err) {
            console.log(err);
        }
    };

    const hi = async () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);

                const signer = provider.getSigner();
                const CounterContract = new ethers.Contract(
                    contractAddress,
                    contractABI,
                    signer
                );

                setIsLoading(true);
                let tx = await CounterContract.add();
                await tx.wait(); //等待完成上链
                setIsLoading(false);

                await getCounts();
            }
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    };

    const getCounts = async () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);

                const signer = provider.getSigner();
                const CounterContract = new ethers.Contract(
                    contractAddress,
                    contractABI,
                    signer
                );

                const counts = await CounterContract.getCounts();
                setCount(counts.toNumber());
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="w-full min-h-screen bg-blue-900 flex flex-col justify-center items-center">
            <h1 className="text-8xl font-bold text-white text-shadow text-center">
                Hello Web3!
            </h1>

            {!account ? (
                <button
                    className="rounded-full py-6 px-12 text-3xl mt-16 text-white bg-purple-700
      hover:scale-105 hover:bg-purple-600 transition"
                    onClick={handleConnectWallet}
                >
                    Connect Wallet
                </button>
            ) : (
                <div>
                    <h2 className="text-6xl text-center mt-24 text-yellow-300 font-bold">
                        👏 {count}
                    </h2>
                    <h3 className="text-3xl text-center text-white text-hold mt-8">
                        Logged in as{' '}
                        <strong>
                            {`${account.substring(0, 4)}...${account.substring(
                                account.length - 4
                            )}`}
                        </strong>
                    </h3>

                    {isLoading ? (
                        <div>loading</div>
                    ) : (
                        <button
                            className="rounded-full py-6 px-12 text-3xl mt-16 text-white bg-purple-700
                hover:scale-105 hover:bg-purple-600 transition"
                            onClick={hi}
                        >
                            Say Hi
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;
