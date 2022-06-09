require("dotenv").config()
const { PORT = 3001, DATABASE_URL } = process.env
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

// Initiate express
const app = express()

// Router
const therapistRouter = require('./routes/Therapist')

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

// Database connection 
require('./config/database')

//models
const Therapist = require('./models/Therapist')
const User = require('./models/User')

// Routes
app.use("/", therapistRouter)

app.listen(PORT, ()=> console.log(`listening on ${PORT}`))