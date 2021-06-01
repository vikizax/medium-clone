import { Router } from 'express';
import { signIn, signUp } from '../../controllers/v1/authentication.controller.js';

const router = Router();

router
    .route('/sigin')
    .post(signIn);

router
    .route('/signup')
    .post(signUp);

export default router;