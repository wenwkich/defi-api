import { ethers } from 'ethers';
import { ERC20_ABI, UNISWAP_ABI } from '../utils/abi';
import { EVM_NETWORKS, EVM_NETWORK_NAME } from '../utils/networks';

export const getRpcProvider = (networkName: EVM_NETWORK_NAME) => {
  const { rpcUrl, chainId } = EVM_NETWORKS[networkName];
  return new ethers.providers.JsonRpcProvider(rpcUrl, chainId);
}

// get native token balance
export const getNativeTokenBalance = async (networkName: EVM_NETWORK_NAME, address: string) => {
  const provider = getRpcProvider(networkName);
  const balanceBN = await provider.getBalance(address);
  return ethers.utils.formatEther(balanceBN);
}

// get token balance
export const getTokenBalance = async (networkName: EVM_NETWORK_NAME, tokenAddress: string, targetAddress: string) => {
  const provider = getRpcProvider(networkName);
  const erc20Contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
  const decimals = await erc20Contract.decimals();
  const balanceBN = await erc20Contract.balanceOf(targetAddress);
  return ethers.utils.formatUnits(balanceBN, decimals);
}

// used for getting user staked amount
export const queryEthContract = async (networkName: EVM_NETWORK_NAME, contractAddress: string, contractAbi: string[], methodName: string, args: any[]) => {
  const provider = getRpcProvider(networkName);
  const ethContract = new ethers.Contract(contractAddress, contractAbi, provider);
  return await ethContract[methodName](...args);
}

// used for query price, token -> native -> stable or call this function 2 times
export const getTokenOutAmount = async (networkName: EVM_NETWORK_NAME, targetDexAddress: string, amountIn: string, path: string[]) => {
  const provider = getRpcProvider(networkName);
  const tokenInContract = new ethers.Contract(path[0], ERC20_ABI, provider);
  const tokenOutContract = new ethers.Contract(path[path.length - 1], ERC20_ABI, provider);
  const tokenInDecimals = await tokenInContract.decimals();
  const tokenOutDecimals = await tokenOutContract.decimals();
  const realAmountIn = ethers.utils.parseUnits(amountIn, tokenInDecimals);
  const uniContract = new ethers.Contract(targetDexAddress, UNISWAP_ABI, provider);
  const amountOutBN = await uniContract.getAmountsOut(realAmountIn, path);
  return ethers.utils.formatUnits(amountOutBN, tokenOutDecimals);
}