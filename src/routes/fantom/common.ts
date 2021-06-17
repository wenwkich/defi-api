import { EVM_NETWORK_NAME } from "../../utils/interface";

export const NETWORK_NAME = EVM_NETWORK_NAME.FANTOM;

export const TOKENS = {
  WFTM: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83",
  USDC: "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75",
  ZOO: "0x09e145A1D53c0045F41aEEf25D8ff982ae74dD56",
  FOO: "0x841FAD6EAe12c286d1Fd18d1d525DFfA75C7EFFE",
};

export const DEXES = {
  SPOOKYSWAP_ROUTER_V2: "0xF491e7B69E4244ad4002BC14e878a34207E38c29",
}

export const STAKES = {

}

export const LP_TOKENS: {[key: string]: {address: string, underlying: string[]}} = {
  LINK_WFTM_SUSHI_LP: {
    address: "",
    underlying: ["LINK", "WFTM"],
  }
}