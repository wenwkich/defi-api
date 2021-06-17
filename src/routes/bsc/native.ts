import express from 'express';
import { nativeTokenBalanceHandler, nativeTokenPriceHandler } from '../../helpers/handlers';
import { NETWORK_NAME, DEXES, TOKENS } from './common';

const router = express.Router();

router.get('/balance',
  nativeTokenBalanceHandler(NETWORK_NAME)
);

router.get('/price',
  nativeTokenPriceHandler(NETWORK_NAME, DEXES.PANCAKESWAP_ROUTER_V1, "1.0", [TOKENS.WBNB, TOKENS.BUSD])
);

export default router;