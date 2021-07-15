import { Request } from 'express';

export interface IUserInfoRequest extends Request {
    user: {
        id: string,
        email: string,
        role: string
    },
    // files: {
    //     image: { type: string, path: string }
    // }
}
