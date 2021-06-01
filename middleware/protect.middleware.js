import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import UserModel from '../models/v1/user.model.js';
import MSG from '../constant/message.constant.js';

const protect = async (req, res, next) => {
    try {
        const secret = process.env.SERVER_SECRET;
        let jwtToken, decoded;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

            jwtToken = req.headers.authorization.split(' ')[1];

        } else if (req.cookies.jwt) {

            jwtToken = req.cookies.jwt;

        } else {

            return res.status(401).json({ message: MSG.NOT_AUTHORIZED });
        }

        decoded = await promisify(jwt.verify)(jwtToken, secret);

        const existingUser = await UserModel.findById(decoded.id).exec();

        if (!existingUser) return res.status(401).json({ message: MSG.NOT_AUTHORIZED });

        existingUser._id = null;

        req.user = {
            ...req.user,
            email: decoded.email,
            id: decoded.id
        }

        res.user = existingUser;

        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: MSG.SERVER_ERROR });
    }
}

export default protect;