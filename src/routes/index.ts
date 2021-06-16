import express from 'express';
import ethereum from './ethereum';
import bsc from './bsc';
import fantom from './fantom';
import polygon from './polygon';
// import solana from './solana';
// import xdai from './xdai';

const router = express.Router();

router.use('/bsc', bsc);
router.use('/ethereum', ethereum);
router.use('/fantom', fantom);
router.use('/polygon', polygon);
// router.use('/solana', solana);
// router.use('/xdai', xdai);

export default router;