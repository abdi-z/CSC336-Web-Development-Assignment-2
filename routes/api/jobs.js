const express = require("express");
let router = express.Router();
var Job = require("../../models/job");

router.get("/", (req, res) => {
  header("Access-Control-Allow-Origin: *");
  Job.find({}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

router.get("/:id", async (req, res) => {
  header("Access-Control-Allow-Origin: *");
  Job.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

router.delete("/:id", async (req, res) => {
  header("Access-Control-Allow-Origin: *");
  await Job.findByIdAndDelete(req.params.id);
  let jobs = await Job.find();
  res.send(jobs);
});

router.put("/:id", async (req, res) => {
  header("Access-Control-Allow-Origin: *");
  let job = await Job.findById(req.params.id);
  job.type = await req.body.type;
  job.budget = await req.body.budget;
  job.descirption = await req.body.descirption;
  await job.save();
  res.send(job);
});

router.post("/", (req, res) => {
  header("Access-Control-Allow-Origin: *");
  let NJob = new Job({
    type: req.body.type,
    budget: req.body.budget,
    description: req.body.description,
  });
  NJob.save((err, data) => {
    if (err) {
      console.log("work");
    } else {
      res.send(data);
    }
  });
});
module.exports = router;
