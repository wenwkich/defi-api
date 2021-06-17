import express from 'express';
import { BadRequestError } from '../../core/ApiError';
import { SuccessResponse } from '../../core/ApiResponse';
import asyncHandler from '../../helpers/asyncHandler';
import { getTokenBalance, getTokenOutAmount } from '../../rpc/evmCall';
import { NETWORK_NAME, DEXES, TOKENS } from './common';

const router = express.Router();

router.get('/',
  asyncHandler(async (req, res) => {
    new SuccessResponse("Successfully queried all tokens", TOKENS).send(res);
  })
);

router.get('/:tokenId/balance',
  asyncHandler(async (req, res) => {
    const addr = req.query.address as string | undefined;
    if (addr === undefined) {
      throw new BadRequestError("No address input");
    }
    const tokenId = req.params.tokenId;
    if (tokenId === undefined) {
      throw new BadRequestError("No token id input");
    }

    const tokenAddr = TOKENS[tokenId.toUpperCase()];
    if (tokenAddr === null || tokenAddr === undefined) {
      throw new BadRequestError("Token id not found");
    }

    const balance = await getTokenBalance(NETWORK_NAME, tokenAddr, addr);
    new SuccessResponse("Successfully queried balance", balance).send(res);
  })
);

router.get('/:tokenId/price',
  asyncHandler(async (req, res) => {
    const tokenId = req.params.tokenId;
    if (tokenId === undefined) {
      throw new BadRequestError("No token id input");
    }
    const tokenAddr = TOKENS[tokenId.toUpperCase()];
    if (tokenAddr === null || tokenAddr === undefined) {
      throw new BadRequestError("Token id not found");
    }

    let vs = req.query.vs as string | undefined;
    if (vs === undefined) {
      vs = "";
    }
    let vsAddr = TOKENS[vs.toUpperCase()];
    if (vsAddr === null || vsAddr === undefined) {
      vsAddr = TOKENS.WFTM;
    }

    const price = await getTokenOutAmount(NETWORK_NAME, DEXES.SPOOKYSWAP_ROUTER_V2, "1.0", [tokenAddr, vsAddr]);
    new SuccessResponse("Successfully queried price", price).send(res);
  })
);

export default router;