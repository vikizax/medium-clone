const cloudinary = require('cloudinary').v2;
const ArticleModel = require('../../models/article.model');
const factoryV2 = require('./factoryV2');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/AppError');

exports.deleteOne = factoryV2.deleteOne(ArticleModel);

exports.uploadImage = catchAsync(
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
