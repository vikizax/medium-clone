import express from 'express';
import cookieParser from 'cookie-parser';
import routes from './routes/v1/index.js';

// dev dep
import morgan from 'morgan'
import dotenv from 'dotenv';

const app = express();
const router = express.Router();


if (process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'));
    dotenv.config();
}

// api endpoint setup
routes(router);

// middleware 
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(cookieParser());

app.use('/api', router)

export default app;
