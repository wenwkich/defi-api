import express from 'express';
import eth from './eth';

const router = express.Router();

router.use('/eth', eth);

export default router;