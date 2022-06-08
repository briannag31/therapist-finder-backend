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

app.get("/", (req,res) =>{
    res.send ("you are home")
})

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