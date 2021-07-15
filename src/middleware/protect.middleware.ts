import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { promisify } from 'util';
import UserModel, { IUserDocument } from '../models/v1/user.model';
import AppError from '../utils/AppError';
import catchAsync from '../utils/catchAsync';
import MSG from '../constant/message.constant';
import { IUserInfoRequest } from '../types/request.type';

const protect = catchAsync(
    async (req: IUserInfoRequest, res: Response, next: NextFunction) => {
        const secret: string = process.env.SERVER_SECRET;
        let jwtToken: string, decoded;

        if (req.cookies.jwt) {

            jwtToken = req.cookies.jwt;

        } else {
            return next(new AppError(MSG.NOT_AUTHORIZED, 401))
        }

        decoded = await promisify<string, string, any>(jwt.verify)(jwtToken, secret);

        const existingUser: IUserDocument = await UserModel.findById(decoded.id);

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