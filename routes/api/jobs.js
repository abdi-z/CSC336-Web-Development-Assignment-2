const express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
  res.send(["job1", "job2", "job3"]);
});

module.exports = router;
