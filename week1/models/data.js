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
    original: { type: String, default: '' },
    delete: { type: Boolean, default: false },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Model = mongoose.model('Test', dataSchema);
exports.Data = Model;
