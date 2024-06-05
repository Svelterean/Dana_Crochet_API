import mongoose, { Schema } from "mongoose";

let usersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    street: {
        type: String,
        default: ''
    },
    zip: {
        type: String,
        default: ''
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

usersSchema.virtual('id').get(function() {
    this._id.toHexString()
})

usersSchema.set('toJSON', {
    virtuals: true
})


export const User = mongoose.model("users", usersSchema)
export const UsersSchema = usersSchema