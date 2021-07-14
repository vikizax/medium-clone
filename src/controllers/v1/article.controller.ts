import { Request, Response, NextFunction } from 'express';
import * as multer from 'multer';
import { unlink } from 'fs/promises';
import factory from './factory';
import catchAsync from '../../utils/catchAsync';
import ArticleModel, { IArticleDocument } from '../../models/v1/article.model';
import { IUserInfoRequest } from '../../types/user-request.type';

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
export const get = factory.getOne(ArticleModel, 'author');

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
export const create = factory.createOne(ArticleModel);

// update a article
export const update = factory.updateOne(ArticleModel);

// delete all article
export const deleteAll = factory.deleteAll(ArticleModel);

// deleta a article
export const deleteOne = catchAsync(
    async (req: IUserInfoRequest, res: Response, next: NextFunction) => {

        const doc = await ArticleModel.findOneAndDelete({
            _id: req.params.id,
            author: req.user.id
        });

        if (!doc) return next(new AppError(MSG.NO_DOCUMENT, 404));

        await unlink('./uploads/' + doc.displayImage);

        res.status(204).json({
            message: MSG.DOCUMENT_DELETE,
            result: null
        });
    }
)

// upload image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${req.user.id}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image')) {
            cb(null, true);
        } else {
            cb(new AppError('Not an Image. Please upload only image.', 400), false)
        }
    }
})

const upload = multer({ storage: storage })

export const uploadImage = upload.single('image');
export const uploadSuccess = (req, res) => res
    .status(200)
    .json({ message: 'Image uploaded.', fileName: res.req.file.filename })
