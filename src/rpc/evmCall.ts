import { ethers } from 'ethers';
import Logger from '../core/Logger';
import { ERC20_ABI, UNISWAP_ABI } from '../utils/abi';
import { EVM_NETWORK_NAME } from '../utils/interface';
import { EVM_NETWORKS } from '../utils/networks';

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
  const tokenInDecimalsPromise = tokenInContract.decimals();
  const tokenOutDecimalsPromise = tokenOutContract.decimals();
  const [tokenInDecimals, tokenOutDecimals] = await Promise.all([tokenInDecimalsPromise, tokenOutDecimalsPromise]);
  const realAmountIn = tokenInDecimals != 0 ? ethers.utils.parseUnits(amountIn, tokenInDecimals) : Math.floor(+amountIn);
  const uniContract = new ethers.Contract(targetDexAddress, UNISWAP_ABI, provider);
  const amountOuts = await uniContract.getAmountsOut(realAmountIn, path);
  return tokenOutDecimals != 0 ? ethers.utils.formatUnits(amountOuts[path.length - 1], tokenOutDecimals) : amountOuts[path.length - 1];
}

// used for getting token infomation
export const getTokenInfo = async (networkName: EVM_NETWORK_NAME, tokenAddr: string) => {
  const provider = getRpcProvider(networkName);
  const tokenContract = new ethers.Contract(tokenAddr, ERC20_ABI, provider);
  const tokenDecimalPromise = tokenContract.decimals();
  const tokenSymbolPromise = tokenContract.symbol();
  const [decimals, symbol] = await Promise.all([tokenDecimalPromise, tokenSymbolPromise]);
  return  { decimals, symbol };
}