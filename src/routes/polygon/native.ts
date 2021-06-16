import express from 'express';
import { BadRequestError } from '../../core/ApiError';
import { SuccessResponse } from '../../core/ApiResponse';
import asyncHandler from '../../helpers/asyncHandler';
import { getNativeTokenBalance, getTokenOutAmount } from '../../rpc/evmCall';
import { NETWORK_NAME, CONTRACTS, TOKENS } from './common';

const router = express.Router();

router.get('/balance',
  asyncHandler(async (req, res) => {
    const addr = req.query.address as string | undefined;
    if (addr === undefined) {
      throw new BadRequestError("No address input");
    }
    const balance = await getNativeTokenBalance(NETWORK_NAME, addr);
    new SuccessResponse("Successfully queried balance", balance).send(res);
  })
);

router.get('/price',
  asyncHandler(async (req, res) => {
    const price = await getTokenOutAmount(NETWORK_NAME, CONTRACTS.QUICKSWAP_ROUTER_V2, "1.0", [TOKENS.WMATIC, TOKENS.USDC]);
    new SuccessResponse("Successfully queried price", price).send(res);
  })
);

export default router;