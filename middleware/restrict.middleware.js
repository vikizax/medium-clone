import AppError from './../utils/AppError.js';
import MSG from './../constant/message.constant.js';

const restrict = (...roles) => {
    return (req, res, next) => {

        if (!roles.includes(req.user.role))
            return next(new AppError(MSG.NO_PERMISSION, 403));

        next();
    }
}

export default restrict;