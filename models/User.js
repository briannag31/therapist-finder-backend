const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: false,
    },
    phone:{
        type: String,
        match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
        required: false
    },
    avatar:{
        type: String,
        required: false
    },
    googleId:{
        type: String,
        required: true 
    },
    reviewedTherapists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Therapist'
    }]
})

module.exports = mongoose.model("User", userSchema)