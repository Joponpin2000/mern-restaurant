const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    productDesc: {
        type: String,
        required: true,
        trim: true,
        maxLength: 200
    },
    productCategory: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    productImage: {
        type: String,
        required: true,
        trim: true,
    },
    productPrice: {
        type: Number,
        required: true,
        trim: true,
    },
    productQty: {
        type: Number,
        required: true,
    }
}, { timestamps: true })

const Product = mongoose.model('Product', productSchema);

module.exports = Product;