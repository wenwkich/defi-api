import express from 'express';
import native from './native';
import tokens from './tokens';
import contracts from './contracts';

const router = express.Router();

router.use('/native', native);
router.use('/tokens', tokens);
router.use('/contracts', contracts);

export default router;