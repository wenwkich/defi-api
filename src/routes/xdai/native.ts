import express from 'express';
import { SuccessResponse } from '../../core/ApiResponse';
import asyncHandler from '../../helpers/asyncHandler';
import { nativeTokenBalanceHandler, nativeTokenPriceHandler } from '../../helpers/handlers';
import { NETWORK_NAME, DEXES, TOKENS } from './common';

const router = express.Router();

router.get('/balance',
  nativeTokenBalanceHandler(NETWORK_NAME)
);

router.get('/price',
  asyncHandler(async (req, res) => {
    new SuccessResponse("Successfully queried price", "1.0").send(res);
  })
);

export default router;