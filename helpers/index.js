import ColorContract from '../contracts/Color.json';
import Web3 from 'web3';
let contract = require("@truffle/contract");


export const load = async () => {
    await loadWeb3();
    const clientAccount = await loadAccount();
    const loadedContract = await loadContract(clientAccount);
    const mintedTokens = await getMintedTokens(loadedContract);
    return { clientAccount, loadedContract, mintedTokens }
} 

const loadWeb3 = async () => {
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            await ethereum.enable();
            web3.eth.sendTransaction({/* ... */});
        } catch (error) {
        }
    }

    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        web3.eth.sendTransaction({/* ... */});
    }

    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
}

const loadAccount = async () => {
    const clientAccount = await web3.eth.getCoinbase();
    return clientAccount;
}

const loadContract = async () => {
    //get contract
    const colorContract = contract(ColorContract);
    //set provider
    colorContract.setProvider(web3.eth.currentProvider);
    //store loaded contract
    const loadedContract = await colorContract.deployed();
    return loadedContract
}

//get public tokens
const getMintedTokens = async (contract) => {
    const totalTokens = await contract.totalSupply();
    let mintedTokens = [];
    let color;
    for(let i = 0; i < totalTokens; i++) {
        color = await contract.colors(i); 
        mintedTokens.push(color); 
    }
    return mintedTokens;
}

export const checkBrowser = () => {
    if (window.ethereum) {
        return true;
    }
    else if (window.web3) {
        return true;
    }
    return false;
}


