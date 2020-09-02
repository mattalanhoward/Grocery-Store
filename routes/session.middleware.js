const sessionMware = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect("/");
  } else {
    // const newDate = new Date();
    // console.log(
    //   " ISIDE MIDDLEWARE ....",
    //   req.session.cookie.expires,
    //   "now time",
    //   newDate.getDate(),
    //   req.session.cookie.expires - newDate.getDate()
    // );
    // const minutes = 15000;
    // req.session.cookie.expires = new Date(Date.now() + minutes)
  }

  next();
};

/**
 *
 */

// export
module.exports = sessionMware;
