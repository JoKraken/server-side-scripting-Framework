const mongoose = require('mongoose');
const Data = mongoose.Schema;

const dataSchema = new Data({
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
    original: { type: String, default: '' },
    delete: { type: Boolean, default: false }
});

const Model = mongoose.model('Test', dataSchema);
exports.Data = Model;
