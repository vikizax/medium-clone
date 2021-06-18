const Router = require('express').Router;
const signIn = require('../../controllers/v1/authentication.controller').signIn;
const signUp = require('../../controllers/v1/authentication.controller').signUp;
const signOut = require('../../controllers/v1/authentication.controller').signOut;
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

module.exports = router;