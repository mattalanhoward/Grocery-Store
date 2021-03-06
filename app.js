require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const hbs = require("hbs");

const app = express();

// require database configuration
require("./configs/db.config");
require("./configs/session.config")(app);

const categoriesList = ["fruits", "vegetables", "breads", "meat"];
// Middleware Setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "logo1.png")));

hbs.registerHelper("categorySelect", function (value) {
  let retEle = "";
  categoriesList.forEach((ele) => {
    retEle += `<option value="${ele}" `;
    retEle += value === ele ? " selected " : " ";
    retEle += `>  ${ele}  </option>`;
  });
  return retEle;
});

// default value for title local
app.locals.title = "Farm Grocer";

// const index = require('./routes/index');
// app.use('/', index);
//      |  |  |
//      |  |  |
//      V  V  V
app.use("/", require("./routes/index.routes"));

app.use("/register", require("./routes/auth.routes"));
app.use("/login", require("./routes/login.routes"));

app.use("/edit-profile", require("./routes/profile.routes"));
app.use("/shop", require("./routes/shop.routes"));
app.use("/cart", require("./routes/cart.routes"));
app.use("/categories", require("./routes/shop.routes"));
app.use("/product", require("./routes/product.routes"));
module.exports = app;
