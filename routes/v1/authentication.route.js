import { Router } from 'express';
import { signIn, signUp, signOut } from '../../controllers/v1/authentication.controller.js';

const router = Router();

router
    .route('/signin')
    .post(signIn);

router
    .route('/signup')
    .post(signUp);

router
    .route('/signout')
    .get(signOut)

export default router;