import { create, getAll, deleteAll, get, deleteOne } from '../../controllers/v1/article.controller.js';

export default (router) => {

    router
        .route('/article')
        .post(create);

    router
        .route('/article/:id')
        .get(get)
        .delete(deleteOne);

    router
        .route('/articles')
        .get(getAll)
        .delete(deleteAll);

}