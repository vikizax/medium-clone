const UserModel = require('../../models/user.model');
const factory = require('./factory');

exports.getOne = factory.getOne(UserModel);

exports.getAll = factory.getAll(UserModel);

exports.deleteOne = factory.deleteOne(UserModel);

exports.deleteAll = factory.deleteAll(UserModel);