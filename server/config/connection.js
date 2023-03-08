const mongoose = require("mongoose");

const connectionString = "mongodb://127.0.0.1:27017/community_compass_db";

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = {
  mongooseDb: mongoose.connection,
};
