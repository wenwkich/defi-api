import { BadRequestError, ContractCallError } from "../core/ApiError";
import { SuccessResponse } from "../core/ApiResponse";
import Logger from "../core/Logger";
import { getNativeTokenBalance, getTokenOutAmount } from "../rpc/evmCall";
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