const express = require("express");
const router = express.Router();
const userModel = require("../models/user.model");
const sessionStore = require("./session.middleware");

const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const saltRounds = 10;

/************************************************/
//        HTTP-GET-request: /edit-profile
//        fetches the record from 'clients' collection based on the current user.
//        Renders the edit-profile form "
/************************************************/

router.get("/", sessionStore, (req, res) => {
  console.log(req.session.currentUser);
  const id = req.session.currentUser._id;
  console.log(`CURRENT USER ID: ${id}`);
  const {
    _id,
    firstName,
    lastName,
    email,
    passwordHash,
    address,
    phoneNumber,
  } = req.session.currentUser;
  userModel.findOneAndUpdate(req.session.currentUser).then((userToEdit) => {
    res.render("auth/edit-profile", {
      currentUser: req.session.currentUser,
      userToEdit,
    });
  });
});

router.post("/", sessionStore, (req, res, next) => {
  console.log(req.body);
  const {
    _id,
    firstname: firstName,
    lastname: lastName,
    email,
    password,
    rePassword,
    address,
    phoneNumber,
  } = req.body;

  if (
    firstName === "" ||
    lastName === "" ||
    email === "" ||
    password === "" ||
    rePassword === "" ||
    address === "" ||
    phoneNumber === ""
  ) {
    res.render("auth/edit-profile", {
      currentUser: req.session.currentUser,
      errorMessage: "Please enter the mandatory fields",
    });
    return;
  }

  // Check whether both passwords are matching
  if (password !== rePassword) {
    res.render("auth/edit-profile", {
      currentUser: req.session.currentUser,
      errorMessage: "Both passwords are not same",
    });
    return;
  }
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  // Check for "Speacial characters in password"
  if (!regex.test(password)) {
    res.status(500).render("auth/edit-profile", {
      currentUser: req.session.currentUser,
      errorMessage:
        "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }
  // generate hash keys
  // console.log("before ecnrypting ... ");
  bcryptjs
    .genSalt(saltRounds)
    .then((salt) => {
      // console.log("salt generated", password);
      return bcryptjs.hash(password, salt);
    })
    .then((hashedPassword) => {
      // console.log("hashedPassword: ", hashedPassword);
      return userModel.update({
        firstName,
        lastName,
        email,
        passwordHash: hashedPassword,
        address,
        phoneNumber,
      });
    });

  userModel
    .findOneAndUpdate(_id, {
      firstName,
      lastName,
      email,
      password,
      rePassword,
      address,
      phoneNumber,
    })
    .then((user) => {
      console.log(user);
      req.session.currentUser = user;
      res.render("", { currentUser: req.session.currentUser });
    })
    .catch(
      (error) => res.redirect("/")`Error while editing a USER INFO: ${error}`
    );
});

module.exports = router;
