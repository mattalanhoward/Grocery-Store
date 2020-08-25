const express = require("express");
const router = express.Router();
const userModel = require("../models/user.model");

const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const saltRounds = 10;

/************************************************/
//        HTTP-GET-request: /login
//
//        Renders the   Login Form
/************************************************/
router.get("/", (req, res) => res.render("auth/login"));

/************************************************/
//        HTTP-POST-request: /login
//
//        -> Validates the login form
//        ->  verifies the loing details
//         -> Redirects to homw with "login features "
/************************************************/
router.post("/", (req, res, next) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    res.render("auth/login", {
      errorMessage: "Please enter both, email and password to login.",
    });
    return;
  }

  userModel
    .findOne({ email })
    .then((user) => {
      console.log(user);
      if (!user) {
        res.render("auth/login", {
          errorMessage:
            "email is not registered.  Please retype your email or signup.",
        });
        return;
      } else if (bcryptjs.compareSync(password, user.passwordHash)) {
        req.session.currentUser = user;
        console.log(req.session.currentUser);
        // res.redirect(/"/");
        res.render("", { currentUser: req.session.currentUser });
      } else {
        res.render("auth/login", { errorMessage: "Incorrect password." });
      }
    })
    .catch((error) => next(error));
});

/********************************************** */
// export
module.exports = router;
