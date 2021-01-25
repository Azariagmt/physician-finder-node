const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create geolocation schema
const GeoSchema = new Schema({
    type:{
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
})

const PhysicianSchema = new Schema({
    name: {
        type: String,
        required : [true, 'Name field is required']
    },
    speciality : {
        type: String
    },
    availability : {
        type: Boolean,
        default: false
    }
    // add in geolocation
    ,geometry : GeoSchema
})

const Physician = new mongoose.model('physician', PhysicianSchema)

module.exports = Physician