import { Router } from 'express';
import { getAll, deleteOne, getOne } from '../../controllers/v1/user.controller.js';
import { isLoggedIn } from '../../controllers/v1/authentication.controller.js';

const router = Router();

// get logged in user details
router
    .route('/current')
    .get(isLoggedIn)

router
    .route('/:id')
    .get(getOne)
    .delete(deleteOne);

router
    .route('/')
    .get(getAll);

export default router;