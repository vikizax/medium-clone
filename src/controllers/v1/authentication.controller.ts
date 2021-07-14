import { Request, Response, NextFunction } from 'express';
import { LeanDocument } from 'mongoose'
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import * as sgMail from '@sendgrid/mail';
import { promisify } from 'util';
import UserModel, { IUserDocument } from '../../models/v1/user.model';
import MSG from '../../constant/message.constant';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../utils/AppError';

interface IMailFormat {
    to: string
    subject: string
    text?: string
    html?: string
}

const sendMail = async ({ to, subject, text, html }: IMailFormat) => {

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const msg = {
        to,
        from: process.env.SENDGRID_EMAIL_FROM,
        subject,
        text,
        html
    }
    await sgMail.send(msg);

};

const signToken = (email, id, secret) => {
    return jwt.sign(
        { email, id },
        secret,
        { expiresIn: `${process.env.JWT_EXPIRES_IN_DAYS}d` }
    );
}

const sendSignedTokenCookie = (request: Request, response: Response, msg: string, result: LeanDocument<any>, token: string) => {
    response
        .status(200)
        .cookie('jwt', token,
            {
                expires:
                    new Date(
                        Date.now() + parseInt(process.env.JWT_EXPIRES_IN_DAYS) * 24 * 60 * 60 * 1000
                    ),
                httpOnly: true, //important
                secure: request.headers['x-forwarded-proto'] === 'https'
            }
        )
        .json({ message: msg, result });
}

export const signIn = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const secret = process.env.SERVER_SECRET;
        const { email, password } = req.body;

        if (!email || !password) return next(new AppError(MSG.EMPTY_CREDENTIALS, 400));

        const existingUser: IUserDocument = await UserModel.findOne({ email }).select('+password');

        if (!existingUser || !(await bcrypt.compare(password, existingUser.password)))
            return next(new AppError(MSG.INVALID_CREDENTIALS, 401));

        const jwtToken = signToken(existingUser.email, existingUser._id, secret);

        const result = existingUser.toJSON();

        delete result.password;
        delete result['__v'];

        sendSignedTokenCookie(req, res, MSG.SIGN_IN_SUCCESS, result, jwtToken);
    }
);

export const signUp = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const secret = process.env.SERVER_SECRET;

        const { email, password, firstName, lastName } = req.body;

        const existingUser: IUserDocument = await UserModel.findOne({ email });

        if (existingUser) return next(new AppError(MSG.USER_EXIST, 409));

        const result: IUserDocument = await UserModel.create({ email, password, firstName, lastName });

        const jwtToken = signToken(result.email, result.id, secret);

        sendMail({
            to: email,
            subject: MSG.NEW_USER_MAIL_SUBJECT,
            text: `Welcome ${firstName} to MediumClone. Start writing your awsome stories now!`
        })

        sendSignedTokenCookie(req, res, MSG.SIGN_UP_SUCCESS, { email: result.email, firstName: result.firstName, lastName: result.lastName, _id: result.id, role: 'user' }, jwtToken);
    }
);

export const signOut = (req: Request, res: Response) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 1 * 1000),
        httpOnly: true,
        secure: req.headers['x-forwarded-proto'] === 'https'
    });
    res.status(200).json({ message: 'success' });
};

export const isLoggedIn = async (req: Request, res: Response) => {
    if (req.cookies.jwt) {
        try {
            const decoded =
                await promisify<string, string, any>(jwt.verify)(req.cookies.jwt, process.env.SERVER_SECRET);
            // get current logged in user details
            const currentUser: IUserDocument = await UserModel.findById((<{ id: string }>decoded).id);

            if (!currentUser) return res.end();

            return res.status(200).json({
                message: 'You are currently logged in!.',
                result: currentUser
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Ops something went wrong.',
                result: null
            });
        }
    }
    return res.status(200).json({
        message: 'You are currently not logged in!.',
        result: null
    });
}

export const forgetPassword = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const user: IUserDocument = await UserModel.findOne({ email: req.body.email });

        if (!user)
            return next(new AppError('No user found.', 404));

        try {

            const resetToken = user.createPasswordResetToken();

            await user.save({ validateBeforeSave: false });

            const resetURL = `https://${req.get('host')}/resetPassword/${resetToken}`

            await sendMail({
                to: req.body.email,
                subject: 'Reset Password',
                html: `<div>Go to the following link to reset your password: <br> <a href='${resetURL}'>RESET PASSWORD</a></div>`
            });

            res.status(200).json({
                message: MSG.PASSWORD_RESET
            });
        }
        catch (error) {

            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;

            await user.save({ validateBeforeSave: false })

            return next(new AppError(MSG.SERVER_ERROR, 500))

        }
    });

export const updatePassword = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
    const secret = process.env.SERVER_SECRET;

    const token = crypto
        .createHash('sha256')
        .update(req.body.token)
        .digest('hex');

    const user: IUserDocument = await UserModel.findOne({
        passwordResetToken: token,
        passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) return next(new AppError(MSG.PASSWORD_TOKEN_INVALID, 400));

    user.password = req.body.password;
    user.passwordResetExpires = undefined;
    user.passwordResetToken = undefined;

    await user.save();

    const jwtToken = signToken(user.email, user.id, secret);

    sendMail({
        to: user.email,
        subject: 'Password Updated',
        text: MSG.PASSWORD_CHANGED
    })

    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 1 * 1000),
        httpOnly: true,
        secure: req.headers['x-forwarded-proto'] === 'https'
    });
    res.status(200).json({ message: 'Password Changed success.' });
});