
const express = require('express')
const router = express.Router()
const therapistController = require("../controllers/Therapist")

//iduces

// index of api
router.get("/", therapistController.index);

// seed therapist
router.get("/seed", therapistController.seed);

// get therapists
router.get("/therapists", therapistController.all);

// delete therapist 
router.delete("/therapists/:id", therapistController.remove);

// update therapist 
router.put("/therapists/:id", therapistController.update);

// create therapist
router.post("/therapists", therapistController.create);

// show therapist by id
router.get("/therapists/:id", therapistController.show)

module.exports = router
