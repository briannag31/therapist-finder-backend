
const express = require('express');
const req = require('express/lib/request');
const router = express.Router()
const therapistController = require("../controllers/Therapist")
const Therapist = require("../models/Therapist")

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


/// routes for reviews
// add review to therapist 
router.post("/therapists/review/:id",(req,res)=>{
    Therapist.findById(req.params.id, (err,therapist)=>{
        
        therapist.reviews.push(req.body)
        // User.findById(req.user, (err,user)=>{
        //     user.reviewedTherapists.push(req.params.id);
        //     user.save((err)=>console.log(err))
        // })
        therapist.save((err)=>{
            res.json({error:err})
        })
    })
})


// delete review from therapist
router.delete("/therapists/review/:therapistId/:reviewId/",(req,res)=>{
    Therapist.findById(req.params.therapistId,(err,therapist)=>{
        therapist.reviews.forEach((review,index,array)=>{
            if( review._id.toString() === req.params.reviewId ){
                array.splice(index,1)
            }
        })
        therapist.save((err)=>{
            if(err) console.log("this is an err: ", err)
            res.json(therapist)
        })
    })
})


// update review from therapist
router.put("/therapists/review/:therapistId/:reviewId/",(req,res)=>{
    Therapist.findById(req.params.therapistId,(err,therapist)=>{
        therapist.reviews.forEach((review,index,array)=>{
            if( review._id.toString() === req.params.reviewId ){
                const newReviewData = { ...req.body }
                const newReview = Object.assign(review, newReviewData)
                // res.json(newReview)
            }
        })
        therapist.save((err)=>{
            if(err) console.log("this is an err: ", err)
            res.json(therapist)
        })
    })
})






module.exports = router
