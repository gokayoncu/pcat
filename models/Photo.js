const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PhotoSchema = new Schema({
    title: String,
    description: String,
    image: String,
    dateCreated: {
        type: Date,
        default: Date.now
    },
    // filename: String,
    // views: Number,
    // likes: Number
})
const Photo = mongoose.model('Photo', PhotoSchema);

module.exports = Photo;