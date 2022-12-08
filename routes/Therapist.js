const express = require('express');
const router = express.Router()
const therapistController = require("../controllers/Therapist")
const Therapist = require("../models/Therapist")
const User = require("../models/User")

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


// routes for reviews
// add review to therapist 
router.post("/therapists/review/:therapistId/user/:userId",(req,res)=>{
    console.log(req.body, req.params.userId)
    Therapist.findById(req.params.therapistId, (err,therapist)=>{
        therapist.reviews.push(req.body)
        if(req.params.userId !== "undefined"){

            User.findById(req.params.userId, (err,user)=>{
                user.reviewedTherapists.push(req.params.therapistId);
                user.save((err)=>console.log("this is user err",err))
            })
        }
        therapist.save((err,data)=>{
            res.json({error:data})
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



router.get("/user/:googleId",(req,res)=>{
    User.find({googleId: req.params.googleId},(err,user)=>{
        if(err){
            console.log(err)
        }else{
            res.json(user)
        }
    })

})

router.post("/user",(req,res)=>{
    const {name, email, picture, sub} = req.body
    // console.log(name, email, picture, sub)
    User.findOne(req.body,(err,user)=>{
        if(user){
            res.json({message: "user already exists not creating user"})
        } else{
            const newUser = new User({
                name: name,
                email: email,
                avatar: picture,
                googleId: sub
            })
            newUser.save((err,data)=>{
                if(err){
                
                    res.json(err)
                } else{
                    res.json(data)
                }
                    
            })
        }
    })
})







module.exports = router
