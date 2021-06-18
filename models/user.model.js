const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail.js');
const bcrypt = require('bcryptjs');

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
            requried: [true, 'Email is required'],
            validate: [isEmail, 'Please provide a valid email']
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Length of password should be equal to or more than 6'],
            select: false
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        }
    }
);

// hash user password before saving
UserSchema.pre('save', async function (next) {

    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);

    next();
});


const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;