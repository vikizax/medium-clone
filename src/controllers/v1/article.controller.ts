import { Request, Response, NextFunction } from 'express';
import factory from './factory';
import catchAsync from '../../utils/catchAsync';
import ArticleModel, { IArticleDocument } from '../../models/v1/article.model';
import { IUserInfoRequest } from '../../types/request.type';
import { v2 as cloudinary } from 'cloudinary';
import { modelType } from '../../types/factory.type';

// get all articles
export const getAll = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        let query = ArticleModel.find();

        query.populate('author');

        const docs: IArticleDocument[] = await query;

        const message: string = docs.length > 0 ? MSG.DOCUMENTS_FOUND : MSG.COLLECTION_EMPTY;

        res.status(200).json({
            message,
            result: docs
        });

    }
)

// get a article
export const get = factory.getOne(ArticleModel as modelType, 'author');

// get all the user's articles
export const getMy = catchAsync(
    async (req: IUserInfoRequest, res: Response, next: NextFunction) => {

        const docs: IArticleDocument[] = await ArticleModel.find({ author: req.user.id });

        if (!docs) return next(new AppError(MSG.NO_DOCUMENT, 404));

        res.status(200).json({
            message: MSG.DOCUMENTS_FOUND,
            result: docs
        });

    }
)

// create a article
export const create = factory.createOne(ArticleModel as modelType);

// update a article
export const update = factory.updateOne(ArticleModel as modelType);

// delete all article
export const deleteAll = factory.deleteAll(ArticleModel as modelType);

// deleta a article
export const deleteOne = catchAsync(
    async (req, res, next) => {

        const doc: IArticleDocument = await ArticleModel.findOneAndDelete({
            _id: req.params.id,
            author: req.user.id
        });

        if (!doc) return next(new AppError(MSG.NO_DOCUMENT, 404));

        await cloudinary.uploader.destroy(doc.displayImage.public_id);

        res.status(204).json({
            message: MSG.DOCUMENT_DELETE,
            result: null
        });

    }
);

// image upload
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
