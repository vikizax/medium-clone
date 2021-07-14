const jwt = require('jsonwebtoken');
const promisify = require('util').promisify;
const UserModel = require('../models/user.model');
const MSG = require('../constant/message.constant');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

const protect = catchAsync(
    async (req, res, next) => {
        const secret = process.env.SERVER_SECRET;
        let jwtToken, decoded;

        if (req.cookies.jwt) {

            jwtToken = req.cookies.jwt;

        } else {
            return next(new AppError(MSG.NOT_AUTHORIZED, 401))
        }

        decoded = await promisify(jwt.verify)(jwtToken, secret);

        const existingUser = await UserModel.findById(decoded.id);

        if (!existingUser) return next(new AppError(MSG.NOT_AUTHORIZED, 401))

        req.user = {
            ...req.user,
            email: existingUser.email,
            id: existingUser.id,
            role: existingUser.role
        }

        next();
    }
);

module.exports = protect;