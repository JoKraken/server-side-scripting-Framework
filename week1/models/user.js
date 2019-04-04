const mongoose = require('mongoose');
const User = mongoose.Schema;

const userSchema = new User({
    username: { type: String, default: 'admin' },
    password: { type: String, default: 'admin123' },
});

const Model = mongoose.model('User', userSchema);
exports.User = Model;
