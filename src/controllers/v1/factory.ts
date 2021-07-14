import { Model } from 'mongoose';
import { IArticleDocument } from '../../models/v1/article.model';
import { IUserDocument } from '../../models/v1/user.model';

import catchAsync from '../../utils/catchAsync';
import AppError from '../../utils/AppError';
import MSG from '../../constant/message.constant';

type modelType = Model<IArticleDocument> | Model<IUserDocument>

export default {
    createOne: (Model: modelType) => {
        return catchAsync(
            async (req, res, next) => {
                const doc = await Model.create(req.body);

                res.status(201).json({
                    message: MSG.CREATE_SUCCESS,
                    result: doc
                });
            }
        );
    },

    getOne: (Model: modelType, popOptions?: string) => {
        return catchAsync(
            async (req, res, next) => {
                let query = Model.findById(req.params.id);

                if (popOptions) query = query.populate(popOptions);

                const doc = await query;

                if (!doc) return next(new AppError(MSG.NO_DOCUMENT, 404));

                res.status(200).json({
                    message: MSG.DOCUMENT_FOUND,
                    result: doc
                });
            }
        )
    },


    deleteAll: Model => {
        return catchAsync(
            async (req, res, next) => {

                await Model.deleteMany({});

                res.status(204).json({
                    message: MSG.DUCUMENTS_DELETE,
                    result: null
                });
            }
        )
    },

    updateOne: Model => {
        return catchAsync(
            async (req, res, next) => {

                const doc = await Model.findOneAndUpdate(
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






