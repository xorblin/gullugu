function connectionInitiate(socket, redisClient) {
  let key = "activeUsers";
  socket.on("connection", (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    redisClient.sAdd(key, socket.id);

    socket.emit("You are connected");
    socket.on("message", (message) => {
      socket.broadcast.emit("message", message);
      socket.emit(message.message);
    });
    socket.on("disconnect", () => {
      redisClient.sRem(key, socket.id);
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
}
module.exports = connectionInitiate;
