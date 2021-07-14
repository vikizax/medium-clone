import {Schema, Document, model} from 'mongoose';

export interface IArticleDocument extends Document {
    time: Date,
    title: string,
    subtitle: string,
    displayName: {
        url: string,
        public_id: string
    },
    blocks: {
        type: string,
        data: Schema.Types.Mixed 
    }[],
    author: string
}

const ArticleSchema = new Schema(
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
                    data: { type: Schema.Types.Mixed }
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

const ArticleModel = model<IArticleDocument>('Article', ArticleSchema);

export default ArticleModel;
