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

// get user's created article
router
    .route('/stories')
    .get(protect, getMy);

// open to all
router
    .get('/', getAll)
    .get('/:id', get)

// logged in user action  
router.use(protect);

router
    .route('/')
    .post(create)

// update user's article    
router
    .route('/:id')
    .patch(update);

router
    .route('/uploadfile')
    .post(uploadImage, uploadSuccess)

router
    .route('/:id')
    .delete(deleteOne);

// logged in +admin user action
router.use(restrict('admin'))
router
    .route('/')
    .delete(deleteAll);

export default router;