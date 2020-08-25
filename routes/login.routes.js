const express = require("express");
const router = express.Router();
const userModel = require("../models/user.model");

const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const saltRounds = 10;

router.get('/', (req, res) => res.render('auth/login'));

router.post('/', (req, res, next) => {
  const { email, password } = req.body;

  if (email === '' || password === ''){
    res.render('auth/login', {
      errorMessage: 'Please enter both, email and password to login.'
    });
    return;
  }

  userModel.findOne({ email })
    .then(user => {
      console.log(user)
      if (!user) {
        res.render('auth/login', { errorMessage: "email is not registered.  Please retype your email or signup."})
        return;
      } else if (bcryptjs.compareSync(password, user.passwordHash)) {
        req.session.currentUser = user;
        res.redirect('/');
      } else {
        res.render('auth/login', { errorMessage: "Incorrect password." });
      }
    })
    .catch(error=>next(error));
})

module.exports = router;
