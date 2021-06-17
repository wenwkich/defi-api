import express from 'express';
import { nativeTokenBalanceHandler, nativeTokenPriceHandler } from '../../helpers/handlers';
import { NETWORK_NAME, DEXES, TOKENS } from './common';

const router = express.Router();

router.get('/balance',
  nativeTokenBalanceHandler(NETWORK_NAME)
);

router.get('/price',
  nativeTokenPriceHandler(NETWORK_NAME, DEXES.SPOOKYSWAP_ROUTER_V2, "1.0", [TOKENS.WFTM, TOKENS.USDC])
);

export default router;