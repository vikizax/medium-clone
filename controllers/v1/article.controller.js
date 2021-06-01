import ArticleModel from '../../models/v1/article.model.js';
import factory from '../factory.js';

// get all articles
export const getAll = factory.getAll(ArticleModel, 'author');

// get a article
export const get = factory.getOne(ArticleModel, 'author');

// create a article
export const create = factory.createOne(ArticleModel);

// delete all article
export const deleteAll = factory.deleteAll(ArticleModel);

// deleta a article
export const deleteOne = factory.deleteOne(ArticleModel);