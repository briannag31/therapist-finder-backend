const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: false
    },
    email:{
        type: String,
        required: false,
        lowecase: true,
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
    reviewedTherapists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Therapist'
    }]
})

module.exports = mongoose.model("User", userSchema)