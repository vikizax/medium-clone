import { Router } from 'express';
import * as controller from '../../controllers/v1/article.controller'
import protect from '../../middleware/protect.middleware';
import restrict from '../../middleware/restrict.middleware';
import multiparty from 'connect-multiparty';

const router = Router();
const multipartMiddleWare = multiparty();

// get user's created article
router
    .route('/stories')
    .get(protect, controller.getMy);

// open to all
router
    .get('/', getAll)
    .get('/:id', controller.get)

// logged in user action  
router.use(protect);

router
    .route('/')
    .post(controller.create)

// update user's article    
router
    .route('/:id')
    .patch(controller.update);

router
    .route('/uploadfile')
    .post(multipartMiddleWare, controller.uploadImage);

router
    .route('/:id')
    .delete(deleteOne);

// logged in +admin user action
router.use(restrict('admin'))
router
    .route('/')
    .delete(deleteAll);

export default router;