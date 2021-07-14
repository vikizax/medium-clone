import { Request, Response, NextFunction } from 'express';
import UserModel, { IUserDocument } from '../../models/v1/user.model';
import factory from './factory';
import AppError from '../../utils/AppError';
import catchAsync from '../../utils/catchAsync';
import MSG from '../../constant/message.constant';
import { IUserInfoRequest } from '../../types/request.type';
import { modelType } from '../../types/factory.type';

export const getOne = factory.getOne(UserModel as modelType);

export const getAll = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {

        const docs: IUserDocument[] = await UserModel.find();

        const message: string = docs.length > 0 ? MSG.DOCUMENTS_FOUND : MSG.COLLECTION_EMPTY;

        res.status(200).json({
            message,
            result: docs
        });

    }
)

export const deleteOne = catchAsync(
    async (req: IUserInfoRequest, res: Response, next: NextFunction) => {

        const doc = await UserModel.findOneAndDelete({
            _id: req.params.id,
            author: req.user.id
        });

        if (!doc) return next(new AppError(MSG.NO_DOCUMENT, 404));

        res.status(204).json({
            message: MSG.DOCUMENT_DELETE,
            result: null
        });
    }
)

export const deleteAll = factory.deleteAll(UserModel as modelType);