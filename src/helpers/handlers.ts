import { BadRequestError, ContractCallError } from "../core/ApiError";
import { SuccessResponse } from "../core/ApiResponse";
import Logger from "../core/Logger";
import { getNativeTokenBalance, getTokenBalance, getTokenOutAmount, queryEthContract } from "../rpc/evmCall";
import { EVM_NETWORK_NAME } from "../utils/interface";
import asyncHandler from "./asyncHandler";

export const nativeTokenBalanceHandler = (networkName: EVM_NETWORK_NAME) => 
  asyncHandler(async (req, res) => {
    const addr = req.query.address as string | undefined;
    if (addr === undefined) {
      throw new BadRequestError("No address input");
    }
    try {
      const balance = await getNativeTokenBalance(networkName, addr);
      new SuccessResponse("Successfully queried balance", balance).send(res);
    } catch (err) {
      const msg = err.reason;
      Logger.error(err.reason);
      throw new ContractCallError(msg != null ? msg : "Contract Call Error");
    }
  })

export const nativeTokenPriceHandler = (networkName: EVM_NETWORK_NAME, dexAddress: string, inputAmount: string, path: string[]) => 
  asyncHandler(async (req, res) => {
    try {
      const price = await getTokenOutAmount(networkName, dexAddress, inputAmount, path);
      new SuccessResponse("Successfully queried price", price).send(res);
    } catch (err) {
      const msg = err.reason;
      Logger.error(err.reason);
      throw new ContractCallError(msg != null ? msg : "Contract Call Error");
    }
  })

export const tokenBalanceHandler = (networkName: EVM_NETWORK_NAME) =>
  asyncHandler(async (req, res) => {
    const addr = req.query.address as string | undefined;
    if (addr === undefined) {
      throw new BadRequestError("No address input");
    }
    const tokenAddr = req.params.tokenAddr;
    if (tokenAddr === undefined) {
      throw new BadRequestError("No token id input");
    }

    try {
      const balance = await getTokenBalance(networkName, tokenAddr, addr);
      new SuccessResponse("Successfully queried balance", balance).send(res);
    } catch (err) {
      const msg = err.reason;
      Logger.error(err.reason);
      throw new ContractCallError(msg != null ? msg : "Contract Call Error");
    }
  })

export const tokenPriceHandler = (networkName: EVM_NETWORK_NAME, defaultVsAddr: string, defaultRouterAddr: string) =>
  asyncHandler(async (req, res) => {
    const tokenAddr = req.params.tokenAddr;
    if (tokenAddr === undefined) {
      throw new BadRequestError("No token id input");
    }

    let vsAddr = req.query.vsAddr as string | undefined;
    if (vsAddr === undefined) {
      vsAddr = defaultVsAddr;
    }

    let dexAddr = req.query.dexAddr as string | undefined;
    if (dexAddr === undefined) {
      dexAddr = defaultRouterAddr;
    }

    try {
      const price = await getTokenOutAmount(networkName, dexAddr, "1.0", [tokenAddr, vsAddr]);
      new SuccessResponse("Successfully queried price", price).send(res);
    } catch (err) {
      const msg = err.reason;
      Logger.error(err.reason);
      throw new ContractCallError(msg != null ? msg : "Contract Call Error");
    }
  })

export const contractCallHandler = (networkName: EVM_NETWORK_NAME) => 
  asyncHandler(async (req, res) => {
    const contractAddr = req.params.contractAddr;
    if (contractAddr === undefined) {
      throw new BadRequestError("No contract address input");
    }

    const { abi, methodName, args } = req.body;
    const data = await queryEthContract(networkName, contractAddr, abi, methodName, args);
    new SuccessResponse("Successfully queried data", data).send(res);
  })