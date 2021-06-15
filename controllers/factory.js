import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';
import MSG from '../constant/message.constant.js';
// import objectid from 'mongoose/lib/types/objectid.js';
import mongoose from 'mongoose';

export default {
    createOne: Model => {
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

    getOne: (Model, popOptions) => {
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

    getMy: (Model) => {
        return catchAsync(
            async (req, res, next) => {

                let query = Model.find({ author: req.user.id });

                const docs = await query;

                if (!docs) return next(new AppError(MSG.NO_DOCUMENT, 404));

                res.status(200).json({
                    message: MSG.DOUCMENTS_FOUND,
                    result: docs
                });

            }
        )
    },

    getAll: (Model, popOptions) => {
        return catchAsync(
            async (req, res, next) => {
                let query = Model.find();

                if (popOptions) query = query.populate(popOptions);

                const docs = await query;

                const message = docs.length > 0 ? MSG.DOCUMENTS_FOUND : MSG.COLLECTION_EMPTY;

                res.status(200).json({
                    message,
                    result: docs
                });

            }
        )
    },

    deleteOne: Model => {
        return catchAsync(
            async (req, res, next) => {
                const doc = await Model.findByIdAndDelete(req.params.id);

                if (!doc) return next(new AppError(MSG.NO_DOCUMENT, 404));

                res.status(204).json({
                    message: MSG.DOCUMENT_DELETE,
                    result: null
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





