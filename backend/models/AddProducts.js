// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true }, // Reference to the seller
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who added the product
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    images: [{ type: String }], // Array of image URLs
    stock: { type: Number }, // Number of items in stock
    availability: { type: Boolean }, // Availability status
    brand: { type: String }, // Brand of the product
    reviews: [{ type: Object }], // Array of reviews (could be an object with review details)
    color: { type: String }, // Color of the product
    size: { type: String }, // Size of the product
    weight: { type: Number }, // Weight of the product
    dimensions: { // Dimensions of the product
        type: {
            length: { type: Number }, // Length in cm
            width: { type: Number }, // Width in cm
            height: { type: Number }, // Height in cm
        },
        required: true
    },
    createdAt: { type: Date, default: Date.now }, // Date of creation
    updatedAt: { type: Date, default: Date.now }, // Date of last update
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
