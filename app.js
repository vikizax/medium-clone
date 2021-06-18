import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'

import AppError from './utils/AppError.js';
import globalErrorController from './controllers/globalError.controller.js';

// routes
import articleRouter from './routes/v1/article.route.js';
import articleRouterV2 from './routes/v2/article.route.js';
import authenticationRouter from './routes/v1/authentication.route.js';
import userRouter from './routes/v1/user.route.js';

// dev dep
import morgan from 'morgan';
import dotenv from 'dotenv';


const app = express();

if (process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'));
}

dotenv.config({
    path: './.env'
});

// middleware 
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(cookieParser());
app.use('/uploads', express.static('uploads'))

// version 1 routes
app.use('/api/v1/article', articleRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/auth', authenticationRouter);

//  version 2 routes
app.use('/api/v2/article', articleRouterV2);

app.all('*', (req, res, next) => {
    next(new AppError(`Cannot find ${req.originalUrl} on the server`, 404));
});

// error controller
app.use(globalErrorController);

export default app;
