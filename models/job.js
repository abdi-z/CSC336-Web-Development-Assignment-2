var mongoose = require("mongoose");

let jobSchema = new mongoose.Schema({
  type: { type: String, required: true },
  budget: Number,
  description: String,
});

let Job = mongoose.model("Job", jobSchema);

module.exports = Job;
