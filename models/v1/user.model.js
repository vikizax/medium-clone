import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'First name is required']
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            unique: true,
            requried: [true, 'Email is required']
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            select: false
        }
    }
);

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;