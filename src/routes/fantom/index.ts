import express from 'express';
import native from './native';
import tokens from './tokens';
import stakes from './stakes';

const router = express.Router();

router.use('/native', native);
router.use('/tokens', tokens);
router.use('/stakes', stakes);

export default router;