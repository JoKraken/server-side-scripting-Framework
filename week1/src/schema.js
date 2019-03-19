const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    time: { type: Date, default: Date.now },
    category: String,
    title: String,
    details: String,
    coordinates: {
        lat: Number,
        lng: Number
    },
    thumbnail: String,
    image: String,
    original: String
});

const Data = mongoose.model('Data', dataSchema);
exports.Data = Data;