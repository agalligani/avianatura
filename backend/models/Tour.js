const mongoose = require('mongoose')

const tourSchema = new mongoose.Schema({
    tourname: {
        type: String,
        required: true
    },
    country: {
        type: String,
    },
    startdate: {
        type: Date
    },
    enddate: {
        type: Date
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