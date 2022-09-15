const mongoose = require("mongoose");
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

mongoose
  .connect(process.env.MONGODB_URI  || 'mongodb://127.0.0.1:27017/plant-swap', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .catch((err) => {
    console.log(err);
    console.log(
      "⛔ There was an error connecting to MongoDB. See above for details."
    );
    console.log(process.env.MONGODB_URI);
    console.log("Shutting down.");
    process.exit(1);
  });

module.exports = mongoose.connection;
