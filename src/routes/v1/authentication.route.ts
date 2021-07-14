import { Router } from "express";
import * as controller from '../../controllers/v1/authentication.controller';
import protect from '../../middleware/protect.middleware';
const router = Router();

router
    .route('/signin')
    .post(controller.signIn);

router
    .route('/signup')
    .post(controller.signUp);

router
    .route('/forgetPassword')
    .post(controller.forgetPassword);

router
    .route('/updatePassword')
    .patch(controller.updatePassword);

// logged in user action
router.use(protect);

router
    .route('/signout')
    .get(controller.signOut);
    
export default router;