import { Router } from 'express';
import { getAll, deleteOne, getOne, deleteAll } from '../../controllers/v1/user.controller.js';
import { isLoggedIn } from '../../controllers/v1/authentication.controller.js';
import restrict from '../../middleware/restrict.middleware.js';
import protect from '../../middleware/protect.middleware.js';

const router = Router();

// get logged in user details
router
    .route('/current')
    .get(isLoggedIn)

// logged in user action
router.use(protect);
router.get('/me', getOne);

// logged in +admin user action
router.use(restrict('admin'));
router
    .route('/:id')
    .get(getOne)
    .delete(deleteOne);
router
    .route('/')
    .get(getAll)
    .delete(deleteAll);

export default router;