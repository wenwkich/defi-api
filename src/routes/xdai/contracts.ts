import express from 'express';
import { contractCallHandler } from '../../helpers/handlers';
import { NETWORK_NAME, } from './common';

const router = express.Router();

router.post('/:contractAddr/call',
  contractCallHandler(NETWORK_NAME)
);

export default router;