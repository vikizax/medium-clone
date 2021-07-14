import { Schema, Document, model, HookNextFunction } from 'mongoose';
import * as crypto from 'crypto';
import isEmail from 'validator/lib/isEmail';
import * as bcrypt from 'bcryptjs';

export interface IUserInput {
    firstName: string,
    lastName?: string,
    email: string,
    password: string,
    role: string,
}

export interface IUserDocument extends IUserInput, Document {
    fullName: string,
    passwordResetToken: string,
    passwordResetExpires: number,
    createPasswordResetToken(): string
}

const UserSchema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, 'First name is required']
        },
        lastName: String,
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
        },
        passwordResetToken: String,
        passwordResetExpires: Date
    }
);

UserSchema.index({ email: 1 });

UserSchema.virtual('fullName').get(function (this: IUserDocument) {
    return `${this.firstName} ${this.lastName ? this.lastName : ''}`;
})


// hash user password before saving
UserSchema.pre('save', async function (this:IUserDocument, next: HookNextFunction) {

    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);

    next();
});

UserSchema.methods.createPasswordResetToken = function (this: IUserDocument): string {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.
        createHash('sha256')
        .update(resetToken)
        .digest('hex');

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
}

const UserModel = model<IUserDocument>('User', UserSchema);

export default UserModel;