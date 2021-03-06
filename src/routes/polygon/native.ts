import express from 'express';
import { BadRequestError } from '../../core/ApiError';
import { SuccessResponse } from '../../core/ApiResponse';
import asyncHandler from '../../helpers/asyncHandler';
import { nativeTokenBalanceHandler, nativeTokenPriceHandler } from '../../helpers/handlers';
import { getNativeTokenBalance, getTokenOutAmount } from '../../rpc/evmCall';
import { NETWORK_NAME, DEXES, TOKENS } from './common';

const router = express.Router();

router.get('/balance',
  nativeTokenBalanceHandler(NETWORK_NAME)
);

router.get('/price',
  nativeTokenPriceHandler(NETWORK_NAME, DEXES.QUICKSWAP_ROUTER_V2, "1.0", [TOKENS.WMATIC, TOKENS.USDC]),
);

export default router;