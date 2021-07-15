import { Router } from 'express';
import * as controller from '../../controllers/v1/article.controller'
import protect from '../../middleware/protect.middleware';
import restrict from '../../middleware/restrict.middleware';

const router = Router();
// const multipartMiddleWare = multiparty();

// get user's created article
router
    .route('/stories')
    .get(protect, controller.getMy);

// open to all
router
    .get('/', controller.getAll)
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
    .post(controller.multerUpload, controller.uploadImage);

router
    .route('/:id')
    .delete(controller.deleteOne);

// logged in +admin user action
router.use<any>(restrict('admin'))
router
    .route('/')
    .delete(controller.deleteAll);

export default router;