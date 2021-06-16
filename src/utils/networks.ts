import { ETHEREUM_RPC } from "../config";
import { EVM_NETWORK_NAME, Network } from "./interface";


export const EVM_NETWORKS: { [key in EVM_NETWORK_NAME]: Network } = {
  ethereum: {
    rpcUrl: ETHEREUM_RPC,
    chainId: 1,
  },
  bsc: {
    rpcUrl: "https://bsc-dataseed.binance.org/",
    chainId: 56,
  },
  polygon: {
    rpcUrl: "https://matic-mainnet.chainstacklabs.com",
    chainId: 137,
  },
  fantom: {
    rpcUrl: "https://rpcapi.fantom.network",
    chainId: 250,
  },
  xdai: {
    rpcUrl: "https://rpc.xdaichain.com/",
    chainId: 100,
  },
}

export const SOLANA_RPC_URL = "https://api.mainnet-beta.solana.com";