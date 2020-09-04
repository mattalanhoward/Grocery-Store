const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => res.render("index"));

/************************************************/
//        HTTP-GET-request: /logout
//
//         shows the hme page
/************************************************/
router.get("/logout", (req, res) => {
  delete req.session.cartCount;
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
