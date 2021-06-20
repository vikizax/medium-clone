const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
const promisify = require('util').promisify;
const UserModel = require('../../models/user.model');
const MSG = require('../../constant/message.constant');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/AppError');

const sendMail = async ({ to, subject, text, html }) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const msg = {
        to,
        from: process.env.SENDGRID_EMAIL_FROM,
        subject,
        text,
        html
    }
    await sgMail.send(msg);
    console.log('-------New User Mail Sent-------')
};

const signToken = (email, id, secret) => {
    return jwt.sign(
        { email, id },
        secret,
        { expiresIn: `${process.env.JWT_EXPIRES_IN_DAYS}d` }
    );
}

const sendSignedTokenCookie = (request, response, msg, result, token) => {
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

exports.signIn = catchAsync(
    async (req, res, next) => {
        const secret = process.env.SERVER_SECRET;
        const { email, password } = req.body;

        if (!email || !password) return next(new AppError(MSG.EMPTY_CREDENTIALS, 400));

        const existingUser = await UserModel.findOne({ email }).select('+password');

        if (!existingUser || !(await bcrypt.compare(password, existingUser.password)))
            return next(new AppError(MSG.INVALID_CREDENTIALS, 401));

        const jwtToken = signToken(existingUser.email, existingUser._id, secret);

        const result = existingUser.toJSON();

        delete result.password;
        delete result['__v'];

        sendSignedTokenCookie(req, res, MSG.SIGN_IN_SUCCESS, result, jwtToken);
    }
);

exports.signUp = catchAsync(
    async (req, res, next) => {
        const secret = process.env.SERVER_SECRET;

        const { email, password, firstName, lastName } = req.body;

        const existingUser = await UserModel.findOne({ email });

        if (existingUser) return next(new AppError(MSG.USER_EXIST, 409));

        const result = await UserModel.create({ email, password, firstName, lastName });

        const jwtToken = signToken(result.email, result.id, secret);

        sendMail({
            to: email,
            subject: MSG.NEW_USER_MAIL_SUBJECT,
            text: `Welcome ${firstName} to MediumClone. Start writing your awsome stories now!`
        })

        sendSignedTokenCookie(req, res, MSG.SIGN_UP_SUCCESS, { email: result.email, firstName: result.firstName, lastName: result.lastName, _id: result.id, role: 'user' }, jwtToken);
    }
);

exports.signOut = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 1 * 1000),
        httpOnly: true,
        secure: req.headers['x-forwarded-proto'] === 'https'
    });
    res.status(200).json({ status: 'success' });
};

exports.isLoggedIn = async (req, res, next) => {
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

