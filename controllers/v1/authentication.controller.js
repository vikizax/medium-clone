import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../../models/v1/user.model.js';
import MSG from '../../constant/message.constant.js';
import { promisify } from 'util';
import catchAsync from '../../utils/catchAsync.js';
import AppError from '../../utils/AppError.js';

const signToken = (email, id, secret) => {
    return jwt.sign(
        { email, id },
        secret,
        { expiresIn: "1d" }
    );
}

const sendSignedTokenCookie = (response, msg, result, token) => {
    response
        .status(200)
        .cookie('jwt', token,
            {
                expires:
                    new Date(
                        Date.now() + parseInt(process.env.JWT_EXPIRES_IN_DAYS) * 24 * 60 * 60 * 1000
                    )
            }
        )
        .json({ message: msg, result });
}

export const signIn = catchAsync(
    async (req, res, next) => {
        const secret = process.env.SERVER_SECRET;
        const { email, password } = req.body;

        if (!email || !password) return next(new AppError(MSG.EMPTY_CREDENTIALS, 400));

        const existingUser = await UserModel.findOne({ email }).select('+password');

        if (!existingUser || !(await bcrypt.compare(password, existingUser.password)))
            return next(new AppError(MSG.INVALID_CREDENTIALS, 401));

        const jwtToken = signToken(existingUser.email, existingUser._id, secret);

        existingUser._id = null;

        sendSignedTokenCookie(res, MSG.SIGN_IN_SUCCESS, existingUser, jwtToken);
    }
);

export const signUp = catchAsync(
    async (req, res, next) => {
        const secret = process.env.SERVER_SECRET;
        const { email, password, firstName, lastName } = req.body;

        const existingUser = await UserModel.findOne({ email });

        if (existingUser) return next(new AppError(MSG.USER_EXIST, 409));

        const hashPassword = await bcrypt.hash(password, 12);

        const result = await UserModel.create({ email, password: hashPassword, firstName, lastName });

        const jwtToken = signToken(result.email, result.id, secret);

        sendSignedTokenCookie(res, MSG.SIGN_UP_SUCCESS, { email: result.email, firstName: result.firstName, lastName: result.lastName }, jwtToken);
    }
);

export const isLoggedIn = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {

            const decoded =
                await promisify(jwt.verify)
                    (
                        req.cookies.jwt,
                        process.env.SERVER_SECRET
                    );

            // get current logged in user details
            const currentUser = await UserModel.findById(decoded.id);

            if (!currentUser) return next();

            currentUser._id = null;

            res.user = currentUser;

        } catch (error) {
            return next()
        }
    }
    next();
}
