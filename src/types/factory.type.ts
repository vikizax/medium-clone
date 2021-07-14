import { Model } from 'mongoose';
import { IArticleDocument } from '../models/v1/article.model';
import { IUserDocument } from '../models/v1/user.model';

export type modelType = Model<IArticleDocument | IUserDocument>;

export type docType = IArticleDocument | IUserDocument;