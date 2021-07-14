import { Request, Response, NextFunction } from 'express';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../utils/AppError';
import MSG from '../../constant/message.constant';
import { IUserInfoRequest } from '../../types/request.type';
import { modelType, docType } from '../../types/factory.type';

export default {
    createOne: (Model: modelType) => {
        return catchAsync(
            async (req: Request, res: Response, next: NextFunction) => {
                const doc: docType = await Model.create(req.body);

                res.status(201).json({
                    message: MSG.CREATE_SUCCESS,
                    result: doc
                });
            }
        );
    },

    getOne: (Model: modelType, popOptions?: string) => {
        return catchAsync(
            async (req: Request, res: Response, next: NextFunction) => {
                let query = Model.findById(req.params.id);

                if (popOptions) query = query.populate(popOptions);

                const doc: docType = await query;

                if (!doc) return next(new AppError(MSG.NO_DOCUMENT, 404));

                res.status(200).json({
                    message: MSG.DOCUMENT_FOUND,
                    result: doc
                });
            }
        )
    },

    deleteAll: (Model: modelType) => {
        return catchAsync(
            async (req: Request, res: Response, next: NextFunction) => {

                await Model.deleteMany({});

                res.status(204).json({
                    message: MSG.DUCUMENTS_DELETE,
                    result: null
                });
            }
        )
    },

    updateOne: (Model: modelType) => {
        return catchAsync(
            async (req: IUserInfoRequest, res: Response, next: NextFunction) => {

                const doc: docType = await Model.findOneAndUpdate(
                    { _id: req.params.id, author: req.user.id },
                    req.body,
                    {
                        new: true,
                        runValidators: true
                    });

                if (!doc) return next(new AppError(MSG.NO_DOCUMENT, 404));

                res.status(200).json({
                    message: MSG.DOCUMENT_UPDATE,
                    result: doc
                });
            }
        )
    }
}






