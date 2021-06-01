import UserModel from '../../models/v1/user.model.js';
import factory from '../factory.js';

export const getOne = factory.getOne(UserModel);

export const getAll = factory.getAll(UserModel);

export const deleteOne = factory.getOne(UserModel);

export const deleteAll = factory.deleteAll(UserModel);