const express = require("express");
const router = express.Router();
const userModel = require("../models/user.model");

const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const saltRounds = 10;


/************************************************/
//        HTTP-GET-request: /edit-profile
//        fetches the record from 'clients' collection based on the current user.
//        Renders the edit-profile form "
/************************************************/

router.get("/", (req, res) => {
  console.log(userInSession)
      res.render("auth/edit-profile", { userInSession: req.session.currentUser });
  })


// router.post("/", (req, res) => {
//   // console.log(req.body);
//   const {
//     firstname: fname,
//     lastname: lname,
//     email,
//     password,
//     rePassword,
//     address,
//     phone,
//   } = req.body;

//   // Check for empty values
//   if (
//     fname === "" ||
//     lname === "" ||
//     email === "" ||
//     password === "" ||
//     rePassword === "" ||
//     address === "" ||
//     phone === ""
//   ) {
//     res.render("auth/register", {
//       errorMessage: "Please enter the mandatory fields",
//     });
//     return;
//   }

//   // Check whether both passwords are matching
//   if (password !== rePassword) {
//     res.render("auth/register", {
//       errorMessage: "Both passwords are not same",
//     });
//     return;
//   }
//   const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
//   // Check for "Speacial characters in password"
//   if (!regex.test(password)) {
//     res.status(500).render("auth/register", {
//       errorMessage:
//         "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
//     });
//     return;
//   }
//   // generate hash keys
//   // console.log("before ecnrypting ... ");
//   bcryptjs
//     .genSalt(saltRounds)
//     .then((salt) => {
//       // console.log("salt generated", password);
//       return bcryptjs.hash(password, salt);
//     })
//     .then((hashedPassword) => {
//       // console.log("hashedPassword: ", hashedPassword);
//       return userModel.create({
//         firstName: fname,
//         lastName: lname,
//         email,
//         passwordHash: hashedPassword,
//         address,
//         phoneNumber: phone,
//       });
//     })
//     .then((resultfromDB) => {
//       console.log("User is successfully created.... ");
//       res.redirect("/");
//       // console.log(resultfromDB);
//     })
//     .catch((error) => {
//       if (error instanceof mongoose.Error.ValidationError) {
//         res
//           .status(500)
//           .render("auth/register", { errorMessage: error.message });
//       } else if (error.code === 11000) {
//         res.status(500).render("auth/register", {
//           errorMessage:
//             "An account is already registered with your email address",
//         });
//       } else {
//         console.log(error);
//       }
//     });
// });

module.exports = router;
