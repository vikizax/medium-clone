import { Request, Response, NextFunction } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import ArticleModel from '../../models/v2/article.model';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../utils/AppError';
import factoryV2 from './factoryV2'
import { IUserInfoRequest } from '../../types/user-request.type';
import MSG from '../../constant/message.constant';

export const deleteOne = factoryV2.deleteOne(ArticleModel);

export const uploadImage = catchAsync(
    async (req: IUserInfoRequest, res: Response, next: NextFunction) => {

        if (!req.files.image.type.startsWith('image')) {
            return next(new AppError(MSG.INVALID_FILE, 400));
        }

        const response = await cloudinary.uploader.upload(req.files.image.path, {
            resource_type: 'image',
            folder: "uploads/",
            secure: true
        });

        res.status(200).json({
            message: 'Image uploaded.',
            url: response.url,
            public_id: response.public_id
        });
    }
);
