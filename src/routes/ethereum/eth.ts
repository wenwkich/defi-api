import express from 'express';
import { BadRequestError } from '../../core/ApiError';
import { SuccessResponse } from '../../core/ApiResponse';
import asyncHandler from '../../helpers/asyncHandler';
import { getNativeTokenBalance } from '../../rpc/evmCall';
import { ETHEREUM } from './common';

const router = express.Router();

router.get('/balance',
  asyncHandler(async (req, res) => {
    const addr = req.query.address as string | undefined;
    if (addr === undefined) {
      throw new BadRequestError("No address input");
    }
    const balance = await getNativeTokenBalance(ETHEREUM, addr);
    new SuccessResponse("Successfully queried balance", balance).send(res);
  })
);

router.get('/price',
  asyncHandler(async (req, res) => {

  })
);

export default router;