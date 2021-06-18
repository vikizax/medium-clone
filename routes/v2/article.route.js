import { Router } from 'express';
import multiparty from 'connect-multiparty';
import { uploadImage } from '../../controllers/v2/article.controller.js';
import protect from '../../middleware/protect.middleware.js';
import { deleteOne } from '../../controllers/v2/article.controller.js';
const multipartMiddleWare = multiparty();

const router = Router();

// logged in user action  
router.use(protect);

router
    .route('/:id')
    .delete(deleteOne);

router
    .route('/uploadfile')
    .post(multipartMiddleWare, uploadImage);


export default router;


