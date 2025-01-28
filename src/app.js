import express from 'express';
import cors from 'cors';
import { errorHandler } from './utils/errorHandler.js';

const app = express();

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

// player router 

import playerRouter from './routes/player.route.js';
import categoryRouter from './routes/category.route.js';

app.use('/players', playerRouter);
app.use('/categories', categoryRouter);

app.use(errorHandler);
export default app;