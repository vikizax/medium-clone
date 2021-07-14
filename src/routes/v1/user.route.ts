import { Router } from 'express';
import * as controller from '../../controllers/v1/user.controller';
import { isLoggedIn } from '../../controllers/v1/authentication.controller';
import protect from '../../middleware/protect.middleware';
import restrict from '../../middleware/restrict.middleware';

const router = Router();

// get logged in user details
router
    .route('/current')
    .get(isLoggedIn)

// logged in user action
router.use(protect);
router.get('/me', controller.getOne);

// logged in admin action
router.use(restrict('admin'));
router
    .route('/:id')
    .get(controller.getOne)
    .delete(controller.deleteOne);
router
    .route('/')
    .get(controller.getAll)
    .delete(controller.deleteAll);

export default router;