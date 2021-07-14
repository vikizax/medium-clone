import { Response, NextFunction} from 'express';
import AppError from '../utils/AppError';
import MSG from '../constant/message.constant';
import { IUserInfoRequest } from '../types/request.type';

const restrict = (...roles: string[]) => {
    return (req: IUserInfoRequest, res: Response, next: NextFunction) => {

        if (!roles.includes(req.user.role))
            return next(new AppError(MSG.NO_PERMISSION, 403));

        next();
    }
}

export default restrict;