const sessionMware = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect("/");
  } else {
    // currentUser = req.session.currentUser;
    // res.render("", { currentUser: req.session.currentUser });
  }

  next();
};

// export
module.exports = sessionMware;
