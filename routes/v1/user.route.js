const Router = require('express').Router;
const getAll = require('../../controllers/v1/user.controller').getAll;
const deleteOne = require('../../controllers/v1/user.controller').deleteOne;
const getOne = require('../../controllers/v1/user.controller').getOne;
const deleteAll = require('../../controllers/v1/user.controller').deleteAll;
const isLoggedIn = require('../../controllers/v1/authentication.controller').isLoggedIn;
const restrict = require('../../middleware/restrict.middleware');
const protect = require('../../middleware/protect.middleware');
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
    
module.exports = router;