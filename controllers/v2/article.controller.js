import { v2 as cloudinary } from 'cloudinary';
import ArticleModel from './../../models/article.model.js'
import factoryV2 from './factoryV2.js';
import catchAsync from './../../utils/catchAsync.js';
import AppError from './../../utils/AppError.js';

export const deleteOne = factoryV2.deleteOne(ArticleModel);

export const uploadImage = catchAsync(
    async (req, res, next) => {
        
        if (!req.files.image.type.startsWith('image')) {
            return next(new AppError('Not an Image. Please upload only image.', 400));
        }

        const response = await cloudinary.uploader.upload(req.files.image.path, {
            resource_type: 'image',
            folder: "uploads/"
        });

        return res.status(200).json({
            message: 'Image uploaded.',
            url: response.url,
            public_id: response.public_id
        });
    }
);
