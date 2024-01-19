import express from 'express';
import { addToLikedMovies, getMyList } from '../controllers/UserController.js';

const router = express.Router();

router.post('/add', addToLikedMovies);
router.post('/list/:email', getMyList);

export default router;