import * as express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import globalErrorController from './src/controllers/globalError.controller';
import * as path from 'path';
import * as dotenv from 'dotenv';
import AppError from './src/utils/AppError';

// routes
import articleRouter from './src/routes/v1/article.route';
import articleRouterV2 from './src/routes/v2/article.route';
import authenticationRouter from './src/routes/v1/authentication.route';
import userRouter from './src/routes/v1/user.route';

const app = express();

// dev dep
if (process.env.NODE_ENV === 'development') {
    const morgan = require('morgan');
    app.use(morgan('dev'));
    app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
}

dotenv.config({
    path: './.env'
});

// middleware 
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(cookieParser());
// app.use('/uploads', express.static('uploads'))

// version 1 routes
app.use('/api/v1/article', articleRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/auth', authenticationRouter);

//  version 2 routes
app.use('/api/v2/article', articleRouterV2);


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', function (req: express.Request, res: express.Response) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    });
}

// default to not found if no route hits.
app.all('*', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    next(new AppError(`Cannot find ${req.originalUrl} on the server`, 404));
});

// error controller
app.use(globalErrorController);

export default app;
