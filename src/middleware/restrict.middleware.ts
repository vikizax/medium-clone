const AppError = require('../utils/AppError');
const MSG = require('../constant/message.constant');

const restrict = (...roles) => {
    return (req, res, next) => {

        if (!roles.includes(req.user.role))
            return next(new AppError(MSG.NO_PERMISSION, 403));

        next();
    }
}

module.exports = restrict;