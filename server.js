import app from './app.js';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';

if (process.env.NODE_ENV == 'development') {
    import('dotenv').then(dotenv => dotenv.config());
}

const port = process.env.PORT || 5000;

// Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// DATABASE
mongoose.
    connect(
        'mongodb://localhost:27017/mediumdb',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }
    )
    .then(() => console.log('database connected..'))
    .catch(error => console.log(error));

// SERVER
const server = app.listen(port, () => console.log(`App is running on port: ${port}`));


// PROCESS EXCEPTION
process.on('unhandledRejection', error => {
    console.log('Unhandled rejection..');
    console.log(error);
    server.close(() => process.exit(1));
});

process.on('SIGTERM', () => {
    console.log('SIGTERM..');
    server.close(() => console.log('Process terminated..'));
});