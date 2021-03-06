import express from 'express';
import { tokenBalanceHandler, tokenPriceHandler } from '../../helpers/handlers';
import { NETWORK_NAME, DEXES, TOKENS } from './common';

const router = express.Router();

router.get('/:tokenAddr/balance',
  tokenBalanceHandler(NETWORK_NAME)
);

router.get('/:tokenAddr/price',
  tokenPriceHandler(NETWORK_NAME, TOKENS.WETH, DEXES.UNISWAP_ROUTER_V2)
);

export default router;