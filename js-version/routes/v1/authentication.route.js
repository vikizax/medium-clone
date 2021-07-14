const Router = require('express').Router;
const protect = require('../../middleware/protect.middleware');
const signIn = require('../../controllers/v1/authentication.controller').signIn;
const signUp = require('../../controllers/v1/authentication.controller').signUp;
const signOut = require('../../controllers/v1/authentication.controller').signOut;
const updatePassword = require('../../controllers/v1/authentication.controller').updatePassword;
const forgetPassword = require('../../controllers/v1/authentication.controller').forgetPassword;
const router = Router();

router
    .route('/signin')
    .post(signIn);

router
    .route('/signup')
    .post(signUp);

router
    .route('/forgetPassword')
    .post(forgetPassword);

router
    .route('/updatePassword')
    .patch(updatePassword);

// logged in user action
router.use(protect);

router
    .route('/signout')
    .get(signOut);

module.exports = router;