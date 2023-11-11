function connectionInitiate(socket){
    socket.on('connection', (socket) => {
        console.log(`⚡: ${socket.id} user just connected!`);
        socket.on("disconnected", () => {
          console.log("🔥: A user disconnected");
        });
    });
}
module.exports = connectionInitiate;