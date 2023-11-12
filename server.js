"use strict";
require("dotenv").config();
const cors = require("cors");
const path = require("node:path");
const express = require("express");
const socket = require("socket.io");
const database = require("./src/utils/database");
const expressLayouts = require("express-ejs-layouts");

const server = express();
const PORT = process.env.GET_PORT ?? 3000;
server.use(cors());
server.use(express.json());
server.use(expressLayouts);
server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "src", "views"));
server.use(express.static(path.join(__dirname, "src", "assets", "styles")));
server.use(express.static(path.join(__dirname, "src", "assets", "images")));
server.use(express.static(path.join(__dirname, "src", "assets", "scripts")));

server.get("/", (req, res, next) => {
  res.render("index");
});

let socketServer = server.listen(PORT, () => {
  console.log(`Server is listing at http://127.0.0.1:${PORT}`);
});

const io = socket(socketServer, {
  cors: "http://127.0.0.1:5173",
});

const connectionInitiate = require("./src/socket/socketInit");
connectionInitiate(io);
