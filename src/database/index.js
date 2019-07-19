const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/express-auth", {
  useCreateIndex: true,
  useNewUrlParser: true
});

module.exports = mongoose;
