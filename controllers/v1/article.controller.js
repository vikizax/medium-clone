import ArticleModel from '../../models/v1/article.model.js';
import multer from 'multer';
import factory from '../factory.js';
import AppError from '../../utils/AppError.js';
import catchAsync from '../../utils/catchAsync.js';


// get all articles
export const getAll = factory.getAll(ArticleModel, 'author');

// get a article
export const get = factory.getOne(ArticleModel, 'author');

// get all the user's articles
export const getMy = factory.getMy(ArticleModel, 'author');

// create a article
export const create = factory.createOne(ArticleModel);

// update a article
export const update = factory.updateOne(ArticleModel);

// delete all article
export const deleteAll = factory.deleteAll(ArticleModel);

// deleta a article
export const deleteOne = factory.deleteOne(ArticleModel);

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
