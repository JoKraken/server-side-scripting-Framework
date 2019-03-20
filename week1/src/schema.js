const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    time: { type: Date, default: Date.now },
    category: { type: String, default: '' },
    title: { type: String, default: '' },
    details: { type: String, default: '' },
    coordinates: {
        lat: Number,
        lng: Number
    },
    thumbnail: { type: String, default: '' },
    image: { type: String, default: '' },
    original: { type: String, default: '' }
});

const Data = mongoose.model('Test', dataSchema);
exports.Data = Data;
