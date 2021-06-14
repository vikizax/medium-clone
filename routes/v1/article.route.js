import { Router } from 'express';
import {
    create,
    getAll,
    deleteAll,
    get,
    getMy,
    update,
    deleteOne,
    uploadImage,
    uploadSuccess
} from '../../controllers/v1/article.controller.js';
import restrict from '../../middleware/restrict.middleware.js';
import protect from '../../middleware/protect.middleware.js';

const router = Router();

// open to all
router
    .get('/', getAll)
    .get('/:id', get)

// logged in user action  
router.use(protect);

router
    .route('/stories')
    .get(getMy);

router
    .route('/')
    .post(create)
    .patch(update)
    .delete(deleteOne)

router
    .route('/uploadfile')
    .post(uploadImage, uploadSuccess)

// logged in +admin user action
router.use(restrict('admin'))
router
    .route('/')
    .delete(deleteAll);
router
    .route('/:id')
    .delete(deleteOne);

export default router;