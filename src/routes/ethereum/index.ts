import express from 'express';
import native from './native';

const router = express.Router();

router.use('/native', native);

export default router;