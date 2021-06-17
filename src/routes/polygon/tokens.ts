import express from 'express';
import { tokenBalanceHandler, tokenPriceHandler } from '../../helpers/handlers';
import { NETWORK_NAME, DEXES, TOKENS } from './common';

const router = express.Router();

router.get('/:tokenAddr/balance',
  tokenBalanceHandler(NETWORK_NAME)
);

router.get('/:tokenAddr/price',
  tokenPriceHandler(NETWORK_NAME, TOKENS.WMATIC, DEXES.QUICKSWAP_ROUTER_V2)
);

// router.get('/:tokenAddr/lp-underlying',

export default router;