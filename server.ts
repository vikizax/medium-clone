import app from './app';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';

const port: number = parseInt(process.env.PORT) || 5000;

// Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const DB = process.env.MONGODB_URI.replace(
    '<password>',
    process.env.MONGODB_PWD
);

// DATABASE
mongoose.
    connect(
        DB,
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