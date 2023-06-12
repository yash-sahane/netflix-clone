import express from 'express';
import { addToLikedMovies } from '../controllers/UserController.js';

const router = express.Router();

router.post('/add', addToLikedMovies);

export default router;