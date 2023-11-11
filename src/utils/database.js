"use strict"
const mongoose = require("mongoose");
const MONGOOSE_URL = process.env.MONGOOSE_CONNECTION_URL;
const connection = mongoose.connection;
mongoose.connect(MONGOOSE_URL);

connection.on("error", (error) => {
    console.log("Mongoose Error: ", error);
});

connection.once("open", () => {
    console.log("Mongoose is connected!");
});