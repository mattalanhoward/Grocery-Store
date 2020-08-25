const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  console.log(res.session);
  console.log("hello");
  next();
});

/* GET home page */
router.get("/", (req, res, next) => res.render("index"));

module.exports = router;
