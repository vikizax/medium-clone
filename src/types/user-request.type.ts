import { Request } from 'express';

export interface IUserInfoRequest extends Request {
    user: {
        id: string,
    },
    files: {
        image: { type: string, path: string }
    }
}
