// require session
const session = require("express-session");

//require mongostore
const MongoStore = require("connect-mongo")(session);

//require mongoose
const mongoose = require("mongoose");

module.exports = (app) => {
  app.use(
    session({
      secret: process.env.SESS_SECRET,
      resave: false,
      saveUninitialized: true,
      rolling: true,
      resave: true,
      cookie: {
        maxAge: 15 * 60 * 1000,
      },
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 60 * 60 * 24,
      }),
    })
  );
};
