require("dotenv").config()
const { PORT = 3001, DATABASE_URL } = process.env
const express = require("express")
const app = express()
const therapistSeedData = require("../therapist-finder-backend/models/therapistSeedData")
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

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    avatarURL: String,
    googleId: String,
    reviewedEvents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }]
});

const reviewSchema = new mongoose.Schema({
    review: String,
    rating: Number,
    reviewedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
})

const TherapistSchema = new mongoose.Schema({
    Name: {type: String, unique:true, required: true},
    Description: {type: String, required: true},
    Portrait: {type: String, required: true},
    Adress: {type: String, required: true},
    PhoneNumber: {type: String, required: true},
    tags:[String],
    latlng: [],
    reviews: [reviewSchema]
})

const Therapist = mongoose.model("Therapist", TherapistSchema)
const User = mongoose.model("User", userSchema)
const Reviews = mongoose.model("Reviews", reviewSchema)

app.get("/", (req,res) =>{
    res.send ("you are home")
})

app.get('/seed', (req, res) => {
    Therapist.deleteMany({}, (err, deletedItems) => {
        Therapist.create(therapistSeedData, (err, data) => {
            res.redirect('/therapists');
        });
    });
});

app.get("/therapists", async (req,res)=>{
    try{
        res.json(await Therapist.find({}))
    } catch (error) {
        res.status(400).json(error)
    }
})

app.post("/therapists", async (req, res) => {
    try {
      res.json(await Therapist.create(req.body))
    } catch (error) {
      res.status(400).json(error)
    }
  })

app.delete("/therapists/:id", async (req, res) => {
    try {
      res.json(await Therapist.findByIdAndDelete(req.params.id))
    } catch (error) {
      res.status(400).json(error)
    }
  })
  
  app.put("/therapists/:id", async (req, res) => {
    try {
      res.json(
        await Therapist.findByIdAndUpdate(req.params.id, req.body, { new: true })
      )
    } catch (error) {
      res.status(400).json(error)
    }
  })


app.listen(PORT, ()=> console.log(`listening on ${PORT}`))