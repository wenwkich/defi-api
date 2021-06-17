import express from 'express';
import { BadRequestError, ContractCallError } from '../../core/ApiError';
import { SuccessResponse } from '../../core/ApiResponse';
import Logger from '../../core/Logger';
import asyncHandler from '../../helpers/asyncHandler';
import { getTokenBalance, getTokenOutAmount } from '../../rpc/evmCall';
import { NETWORK_NAME, DEXES, TOKENS } from './common';

const router = express.Router();

router.get('/',
  asyncHandler(async (req, res) => {
    new SuccessResponse("Successfully queried all tokens", TOKENS).send(res);
  })
);

router.get('/:tokenAddr/balance',
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
      const balance = await getTokenBalance(NETWORK_NAME, tokenAddr, addr);
      new SuccessResponse("Successfully queried balance", balance).send(res);
    } catch (err) {
      const msg = err.reason;
      Logger.error(err.reason);
      throw new ContractCallError(msg != null ? msg : "Contract Call Error");
    }
  })
);

router.get('/:tokenAddr/price',
  asyncHandler(async (req, res) => {
    const tokenAddr = req.params.tokenAddr;
    if (tokenAddr === undefined) {
      throw new BadRequestError("No token id input");
    }

    let vsAddr = req.query.vsAddr as string | undefined;
    if (vsAddr === undefined) {
      vsAddr = TOKENS.WFTM;
    }

    let dex = req.query.dex as string | undefined;
    if (dex === undefined) {
      dex = "";
    }
    let dexAddr = TOKENS[dex.toUpperCase()];
    if (dexAddr === null || dexAddr === undefined) {
      dexAddr = DEXES.SPOOKYSWAP_ROUTER_V2;
    }

    try {
      const price = await getTokenOutAmount(NETWORK_NAME, dexAddr, "1.0", [tokenAddr, vsAddr]);
      new SuccessResponse("Successfully queried price", price).send(res);
    } catch (err) {
      const msg = err.reason;
      Logger.error(err.reason);
      throw new ContractCallError(msg != null ? msg : "Contract Call Error");
    }
  })
);

// router.get('/:tokenAddr/lp-balance',
//   asyncHandler(async (req, res) => {
//     if (tokenAddr === undefined) {
//       throw new BadRequestError("No token id input");
//     }
//     const tokenAddr = TOKENS[tokenAddr.toUpperCase()];
//     if (tokenAddr === null || tokenAddr === undefined) {
//       throw new BadRequestError("Token id not found");
//     }
//   });
// );

export default router;