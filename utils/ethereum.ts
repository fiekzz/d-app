import Web3 from 'web3';
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window{
    ethereum?:MetaMaskInpageProvider
  }
}

const getWeb3 = async (): Promise<Web3> => {
  // Check if the browser has MetaMask or any other Ethereum provider
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    try {
      // Request account access if needed
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      return web3;
    } catch (error) {
      throw new Error('User denied account access');
    }
  } else {
    throw new Error('Please install MetaMask or use an Ethereum browser');
  }
};

export const getContractInstance = async (
  web3: Web3,
  abi: any[], // Replace with your smart contract ABI
  contractAddress: string // Replace with your smart contract address
): Promise<any> => {
  return new web3.eth.Contract(abi, contractAddress);
};

export default getWeb3;