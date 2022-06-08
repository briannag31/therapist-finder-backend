require("dotenv").config()
const { PORT = 3001, DATABASE_URL } = process.env
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const morgan = require("morgan")
