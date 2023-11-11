const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  username: { type: String, required: true },
  socketId: { type: String, required: true },
});

module.exports = mongoose.model("activeUser", Schema);
