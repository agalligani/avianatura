const mongoose = require('mongoose')

const tourSchema = new mongoose.Schema({
    tourname: {
        type: String,
        required: true
    },
    country: {
        type: String,
    },
    countryState: {
        type: String,
    },
    startdate: {
        type: Date
    },
    enddate: {
        type: Date
    },
    lengthInDays: {
        type: Number
    },
    participants: {
        type: Number
    },
    hotspots: [{
        type: String
    }],
    active: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Tour', tourSchema)