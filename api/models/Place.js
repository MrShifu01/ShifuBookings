const mongoose = require('mongoose')

const PlaceSchema = new mongoose.Schema ({
    owner: {type:mongoose.Schema.Types.ObjectId, ref:"User"},
    title: String,
    location: String,
    photos: [String],
    description: String,
    features: [String],
    extraInfo: String,
    checkIn: Number,
    checkOut: Number,
    maxGuests: Number,
})

const PlaceModel = mongoose.model("Place", PlaceSchema)

module.exports = PlaceModel