import express from 'express';
import { BadRequestError } from '../../core/ApiError';
import { SuccessResponse } from '../../core/ApiResponse';
import asyncHandler from '../../helpers/asyncHandler';
import { getTokenBalance, getTokenOutAmount } from '../../rpc/evmCall';
import { NETWORK_NAME, DEXES, TOKENS, STAKES } from './common';

const router = express.Router();

router.get('/',
  asyncHandler(async (req, res) => {
    new SuccessResponse("Successfully queried all tokens", STAKES).send(res);
  })
);

router.get('/:stakeId/single',
  asyncHandler(async (req, res) => {
    const addr = req.query.address as string | undefined;
    if (addr === undefined) {
      throw new BadRequestError("No address input");
    }
    const stakeId = req.params.stakeId;
    if (stakeId === undefined) {
      throw new BadRequestError("No stake id input");
    }

    const tokenAddr = TOKENS[stakeId.toUpperCase()];
    if (tokenAddr === null || tokenAddr === undefined) {
      throw new BadRequestError("Stake id not found");
    }

    const balance = await getTokenBalance(NETWORK_NAME, tokenAddr, addr);
    new SuccessResponse("Successfully queried balance", balance).send(res);
  })
);

router.get('/:stakeId/double',
  asyncHandler(async (req, res) => {
    const stakeId = req.params.stakeId;
    if (stakeId === undefined) {
      throw new BadRequestError("No token id input");
    }
    const tokenAddr = TOKENS[stakeId.toUpperCase()];
    if (tokenAddr === null || tokenAddr === undefined) {
      throw new BadRequestError("Stake id not found");
    }

    let vs = req.query.vs as string | undefined;
    if (vs === undefined) {
      vs = "";
    }
    let vsAddr = TOKENS[vs.toUpperCase()];
    if (vsAddr === null || vsAddr === undefined) {
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

    const price = await getTokenOutAmount(NETWORK_NAME, dexAddr, "1.0", [tokenAddr, vsAddr]);
    new SuccessResponse("Successfully queried price", price).send(res);
  })
);

export default router;