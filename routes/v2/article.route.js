const Router = require('express').Router;
const multiparty = require('connect-multiparty');
const uploadImage = require('../../controllers/v2/article.controller').uploadImage;
const deleteOne = require('../../controllers/v2/article.controller').deleteOne;
const protect = require('../../middleware/protect.middleware');
const multipartMiddleWare = multiparty();

const router = Router();

// logged in user action  
router.use(protect);

router
    .route('/:id')
    .delete(deleteOne);

router
    .route('/uploadfile')
    .post(multipartMiddleWare, uploadImage);

module.exports = router;


