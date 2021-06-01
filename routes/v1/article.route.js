import { Router } from 'express';
import { create, getAll, deleteAll, get, deleteOne } from '../../controllers/v1/article.controller.js';

const router = Router();

router
    .route('/')
    .post(create)
    .get(getAll)
    .delete(deleteAll);

router
    .route('/:id')
    .get(get)
    .delete(deleteOne);

export default router;