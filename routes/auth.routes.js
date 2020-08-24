const express = require("express");
const router = express.Router();
const user = require("../models/user.model");

const mongoose = require("mongoose");

/************************************************/
//        HTTP-GET-request: /register
//
//        Renders the   Registration Form
/************************************************/
router.get("/", (req, res) => {
  res.render("auth/register");
});

/************************************************/
//        HTTP-POST-request: /register
//
//        -> Validates the registration form
//        -> Creates a record for the customer registered
//         -> Redirects to home page
/************************************************/
router.post("/", (req, res) => {
  console.log(req.body);
  const {
    firstname: fname,
    lastname: lname,
    email,
    password,
    rePassword,
    address,
    phone,
  } = req.body;

  // // Check for empty values
  //   if (fname === "" || lname === ""|| email === ""|| password === ""|| password === "") {
  //     res.render("auth/login", {
  //       errorMessage: "Please enter the mandatory fields.",
  //     });
  //     return;
  //   }
  // Check whether both passwords are matching
  if (password !== rePassword) {
    res.render("auth/register", {
      errorMessage: "Both passwords are not same",
    });
    return;
  }
  // user
  //   .create({
  //     firstname: fname,
  //     lastname: lname,
  //     email,
  //     password,
  //     rePassword,
  //     address,
  //     phone,
  //   })
  //   .then((userFromDB) => {})
  //   .catch((error) => {
  //     console.log(error);
  //     if (error instanceof mongoose.Error.ValidationError) {
  //       console.log(" MONGODB VALIDATION ERROR -------");
  //     }
  //   });
});

// export
module.exports = router;
