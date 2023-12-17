const mongoose = require('mongoose');

const masterDataSchema = new mongoose.Schema({
    name: String,
    type: String,
});

module.exports = mongoose.model('master_data', masterDataSchema);