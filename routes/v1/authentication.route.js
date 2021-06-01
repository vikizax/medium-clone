import { signIn, signUp } from '../../controllers/v1/authentication.controller.js';

export default (router) => {
    
    router
        .route('/sigin')
        .post(signIn);

    router
        .route('/signup')
        .post(signUp);

}