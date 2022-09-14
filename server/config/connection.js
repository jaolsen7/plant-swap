const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb+srv://jaolsen7:jsonD3rulo@cluster0.0zqfb.mongodb.net/plant-swap?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .catch((err) => {
    console.log(err);
    console.log(
      "⛔ There was an error connecting to MongoDB. See above for details."
    );
    console.log("Shutting down.");
    process.exit(1);
  });

module.exports = mongoose.connection;
