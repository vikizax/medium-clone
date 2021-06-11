import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import UserModel from '../models/v1/user.model.js';
import MSG from '../constant/message.constant.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';

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

export default protect;