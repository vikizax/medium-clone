const Router = require('express').Router;
const create = require('../../controllers/v1/article.controller').create;
const getAll = require('../../controllers/v1/article.controller').getAll;
const deleteAll = require('../../controllers/v1/article.controller').deleteAll;
const get = require('../../controllers/v1/article.controller').get;
const getMy = require('../../controllers/v1/article.controller').getMy;
const update = require('../../controllers/v1/article.controller').update;
const deleteOne = require('../../controllers/v1/article.controller').deleteOne;
const uploadImage = require('../../controllers/v1/article.controller').uploadImage;
const uploadSuccess = require('../../controllers/v1/article.controller').uploadSuccess;
const restrict = require('../../middleware/restrict.middleware');
const protect = require('../../middleware/protect.middleware');

const router = Router();

// get user's created article
router
    .route('/stories')
    .get(protect, getMy);

// open to all
router
    .get('/', getAll)
    .get('/:id', get)

// logged in user action  
router.use(protect);

router
    .route('/')
    .post(create)

// update user's article    
router
    .route('/:id')
    .patch(update);

router
    .route('/uploadfile')
    .post(uploadImage, uploadSuccess)

router
    .route('/:id')
    .delete(deleteOne);

// logged in +admin user action
router.use(restrict('admin'))
router
    .route('/')
    .delete(deleteAll);

module.exports = router;