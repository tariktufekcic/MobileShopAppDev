const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    userId: {
      type: String,
      ref: 'User',
      required: true
    },
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    
        ram: {
          type: String,
          required: false
        },
        storage: {
          type: String,
          required: false
        },
        battery: {
          type: String,
          required: false
        },
        screenSize: {
          type: String,
          required: false
        },
        camera: {
          type: String,
          required: false
        },
        processor: {
          type: String,
          required: false
        },
        os: {
          type: String,
          required: false
        },
      
      imageUrl: {
        type: String,
        required: true
      }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;