import catchAsync from '../../utils/catchAsync.js';
import AppError from '../../utils/AppError.js';
import MSG from '../../constant/message.constant.js';
import { unlink } from 'fs/promises';

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

    deleteOne: Model => {
        return catchAsync(
            async (req, res, next) => {

                const doc = await Model.findOneAndDelete({
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
    },

    updateOne: Model => {
        return catchAsync(
            async (req, res, next) => {
                console.log(req.user)
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





