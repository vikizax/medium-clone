import { unlink } from 'fs/promises';
import { v2 as cloudinary } from 'cloudinary';
import catchAsync from '../../utils/catchAsync.js';
import AppError from '../../utils/AppError.js';
import MSG from '../../constant/message.constant.js';


export default {
    deleteOne: Model => {
        return catchAsync(
            async (req, res, next) => {
                
                const doc = await Model.findOneAndDelete({
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
        )
    },
}





