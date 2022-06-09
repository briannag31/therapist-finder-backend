const mongoose = require("mongoose")


const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        require: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 5,
        require: true
    },
    reviewedBy: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }
    },
    {timestamps: true}
)

const therapistSchema = new mongoose.Schema({
    name:{
        type: String,
        unique: true,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    portrait:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
        required: true
    },
    tags:[String],
    latlng:[String],
    reviews: [reviewSchema]
})


module.exports = mongoose.model("Therapist", therapistSchema)

