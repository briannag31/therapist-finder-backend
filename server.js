require("dotenv").config()
const { PORT = 3001, DATABASE_URL } = process.env
const express = require("express")
const app = express()

const mongoose = require("mongoose")
const cors = require("cors")
const morgan = require("morgan")

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

mongoose.connect(DATABASE_URL)

mongoose.connection
.on("open", () => console.log("You are connected to MongoDB"))
.on("close", () => console.log("You are disconnected from MongoDB"))
.on("error", (error) => console.log(error))

const TherapistSchema = new mongoose.Schema({
    therapistName: String,
    therapistImage: String,
    therapistDescription: String,
    therapistType: Array,
    therapistReview: Array,
    therapistLocation: {
        Location: String,
        lat_lng: Array
    }
})

const Therapist = mongoose.model("Therapist", TherapistSchema)