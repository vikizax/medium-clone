const cloudinary = require('cloudinary').v2;
const catchAsync = require('./../../utils/catchAsync');
const AppError = require('./../../utils/AppError');
const MSG = require('./../../constant/message.constant');

module.exports = {
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





