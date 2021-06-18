const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const globalErrorController = require('./controllers/globalError.controller');

// routes
const articleRouter = require('./routes/v1/article.route');
const articleRouterV2 = require('./routes/v2/article.route');
const authenticationRouter = require('./routes/v1/authentication.route');
const userRouter = require('./routes/v1/user.route');
// dev dep
const morgan = require('morgan');
const dotenv = require('dotenv');
const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    app.use(cors({ credentials: true, origin: 'http://localhost:3000'}));
}

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', function (req, res) {
        res.sendFile('client/build/index.html')
    });
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

// app.all('*', (req, res, next) => {
//     next(new AppError(`Cannot find ${req.originalUrl} on the server`, 404));
// });

// error controller
app.use(globalErrorController);

module.exports = app;
