mongoose = require('mongoose');

const schema = new mongoose.Schema({
    userId: { type: String, required: true },
    url: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String },
    rating: { type: String },
    number_of_ratings: { type: String },
    number_of_reviews: { type: String },
    media_count: { type: String }
})

const FlipkartData = mongoose.model('FlipkartData', schema);

module.exports = FlipkartData;