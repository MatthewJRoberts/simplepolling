const mongoose = require('mongoose');

let MetaSchema = new mongoose.Schema({
    pollId: {
        type: String,
        required: true,
        unique: true
    },
    voterIps: [String]
});

let Meta = mongoose.model('Meta', MetaSchema, 'metas');

module.exports = { Meta };