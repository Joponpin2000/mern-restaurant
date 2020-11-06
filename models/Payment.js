const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    fullName: {
        type: String,
        trim: true,
    },
    amount: {
        type: Number,
        trim: true,
    },
    reference: {
        type: String,
        trim: true,
    },
}, { timestamps: true })

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;