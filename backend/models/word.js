const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
    word: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('word', wordSchema);