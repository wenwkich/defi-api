import express from 'express';
import native from './native';
import tokens from './tokens';

const router = express.Router();

router.use('/native', native);
router.use('/tokens', tokens);

export default router;