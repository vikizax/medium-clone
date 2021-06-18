import UserModel from '../../models/user.model.js';
import factory from './factory.js';

export const getOne = factory.getOne(UserModel);

export const getAll = factory.getAll(UserModel);

export const deleteOne = factory.deleteOne(UserModel);

export const deleteAll = factory.deleteAll(UserModel);