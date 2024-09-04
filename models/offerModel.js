// Models/offerModel.js

const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    offerText: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'], default: 'Pending' },
    isDeleted: { type: Boolean, default: false } 
}, { timestamps: true });


const Offer = mongoose.model('Offer', offerSchema);
module.exports = Offer;
