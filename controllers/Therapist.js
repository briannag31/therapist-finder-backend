const mongoose = require('mongoose')
const Therapist = require("../models/Therapist");
const therapistSeedData = require("../models/therapistSeedData")

module.exports = {
  index,
  seed,
  all,
  remove,
  update,
  create,
  show,
};

// index
function index(req, res) {
  res.json({message:"you are home"});
}

// seed
async function seed(req, res) {
    try {
        Therapist.deleteMany({}, (err, deletedItems) => {
            Therapist.create(therapistSeedData, (err, data) => {
              // console.log(data)
                res.json(data);
            });
        });
    } catch (error) {
      // console.log("err")
        res.json(error)
    }
}

// all
async function all(req, res){
    try {
      res.json(await Therapist.find({}).populate("reviews.reviewedBy"));
    } catch (error) {
      res.status(400).json(error);
    }
}

// remove
async function remove(req, res){
    try {
      res.json(await Therapist.findByIdAndDelete(req.params.id));
    } catch (error) {
      res.status(400).json(error);
    }
}

// update
async function update(req, res){
    try {
      res.json(
        await Therapist.findByIdAndUpdate(req.params.id, req.body, { new: true })
      );
    } catch (error) {
      res.status(400).json(error);
    }
}

//create
async function create(req, res){
    try {
      res.json(await Therapist.create(req.body));
    } catch (error) {
      res.status(400).json(error);
    }
}

// show by id
async function show(req, res){
    try {
      res.json(await Therapist.findById(req.params.id));
    } catch (error) {
      res.json(error);
    }
};