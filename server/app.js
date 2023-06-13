import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import userRouter from './Routes/UserRoute.js'

export const app = express();

config({
    path: './database/config.env'
})

app.use(express.json());
app.use(cors());
app.use('/user', userRouter);

app.get('/', (req, res) => {
    res.send('Index page');
})