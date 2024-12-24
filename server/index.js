const express = require("express");
const dotenv = require("dotenv").config();
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");

const Port = process.env.PORT || 8080;

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  socket.on("join", (data) => {
    socket.join(data);
  });
  socket.on("send_message", (data) => {
    socket.broadcast.emit("received message", data);
  });
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("received Message", data);
  });
});

server.listen(Port, () => {
  console.log(`Server is running on Port ${Port}`);
});
