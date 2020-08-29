const mongoose = require("mongoose");

mongoose
  // .connect(ONLINE_MONGO, {
  .connect(process.env.MONGODB_URI, {
    // .connect(`mongodb://localhost/farm-grocery`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));
