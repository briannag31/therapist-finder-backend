require("dotenv").config()
const { PORT = 3001, DATABASE_URL } = process.env
const express = require("express")
const app = express()
const therapistSeedData = require("./models/therapistSeedData")
const mongoose = require("mongoose")
const cors = require("cors")
const morgan = require("morgan")
// const Therapist = require("./models/Therapist")

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

// database connection 
require('./config/database')

//models
const Therapist = require('./models/Therapist')
const User = require('./models/User')


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