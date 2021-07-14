const ArticleModel = require('../../models/article.model');
const multer = require('multer');
const factory = require('./factory');
const AppError = require('../../utils/AppError');

// get all articles
exports.getAll = factory.getAll(ArticleModel, 'author');

// get a article
exports.get = factory.getOne(ArticleModel, 'author');

// get all the user's articles
exports.getMy = factory.getMy(ArticleModel);

// create a article
exports.create = factory.createOne(ArticleModel);

// update a article
exports.update = factory.updateOne(ArticleModel);

// delete all article
exports.deleteAll = factory.deleteAll(ArticleModel);

// deleta a article
exports.deleteOne = factory.deleteOne(ArticleModel);

// upload image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${req.user.id}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image')) {
            cb(null, true);
        } else {
            cb(new AppError('Not an Image. Please upload only image.', 400), false)
        }
    }
})

const upload = multer({ storage: storage })

exports.uploadImage = upload.single('image');
exports.uploadSuccess = (req, res) => res
    .status(200)
    .json({ message: 'Image uploaded.', fileName: res.req.file.filename })
