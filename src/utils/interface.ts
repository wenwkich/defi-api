export interface Network {
  rpcUrl: string,
  chainId: number,
}

export enum EVM_NETWORK_NAME {
  ETHEREUM = "ethereum",
  BSC = "bsc",
  POLYGON = "polygon",
  FANTOM = "fantom",
  XDAI = "xdai",
}