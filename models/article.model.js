import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema(
    {
        time: Date,
        title: {
            type: String,
            required: [true, 'Tile is missing']
        },
        subTitle: {
            type: String,
        },
        displayImage: {
            url: {
                type: String,
                required: [true, 'Display image URL is missing']
            },
            public_id: {
                type: String,
                required: [true, 'Display image Public ID is missing']
            },
        },
        blocks:
        {
            type: [
                {
                    type: { type: String },
                    data: { type: mongoose.Schema.Types.Mixed }
                }
            ],
            validate: {
                validator: v => Array.isArray(v) && v.length > 0,
                message: 'Article content is missing.'
            }
        },

        author: {
            type: String,
            ref: 'User',
            required: [true, 'Author is missing']
        }
    }
);

const ArticleModel = mongoose.model('Article', ArticleSchema);

export default ArticleModel;