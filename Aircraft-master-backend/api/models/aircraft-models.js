const mongoose = require('mongoose');
const aircraftSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    manufacturer: String,
    aircraftFamily: String,
    aircraftType: String,
    category: String

});

module.exports = mongoose.model('Aircraft' , aircraftSchema );