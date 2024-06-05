import mongoose, { Schema } from "mongoose";

let productSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    image: String,
    size: String,

    tags: [{
        type: String,
        required: true
    }],

    price: { type: Number, required: true },
    countInStock: { 
        type: Number,
        required: true, 
        min: 1,
        max: 20
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },

    isFeatured: {
        type: Boolean,
        default: false,
    }
})

productSchema.virtual('id').get(function() {
    this._id.toHexString()
})

productSchema.set('toJSON', {
    virtuals: true
})

export const Product = mongoose.model("Product", productSchema)