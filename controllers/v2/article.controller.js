import ArticleModel from '../../models/v1/article.model.js';
import multer from 'multer';
import factoryV1 from '../v1/factory.js';
import AppError from '../../utils/AppError.js';

// get all articles
export const getAll = factoryV1.getAll(ArticleModel, 'author');

// get a article
export const get = factoryV1.getOne(ArticleModel, 'author');

// get all the user's articles
export const getMy = factoryV1.getMy(ArticleModel);

// create a article
export const create = factoryV1.createOne(ArticleModel);

// update a article
export const update = factoryV1.updateOne(ArticleModel);

// delete all article
export const deleteAll = factoryV1.deleteAll(ArticleModel);

// deleta a article
export const deleteOne = factoryV1.deleteOne(ArticleModel);

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

export const uploadImage = upload.single('image');
export const uploadSuccess = (req, res) => res
    .status(200)
    .json({ message: 'Image uploaded.', fileName: res.req.file.filename })
