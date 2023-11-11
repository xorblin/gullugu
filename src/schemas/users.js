const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
  isVerified: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("users", Schema);