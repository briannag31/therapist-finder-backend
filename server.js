require("dotenv").config()
const { PORT = 3001 } = process.env
const cors = require("cors")
const morgan = require("morgan")
const express = require("express")

// intiate express app
const app = express()

// controllers
const therapistRouter = require("./routes/Therapist")

//middleware
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

// Database Connection
require("./config/database")

// Routers
app.use("/api/", therapistRouter)

app.listen(PORT, ()=> console.log(`listening on ${PORT}`))