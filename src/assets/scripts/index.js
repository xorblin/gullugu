const userVideo = document.getElementById("videoElement");
// const canvas = document.getElementById("canvas");
// const context = canvas.getContext("2d");
const messageBtn = document.getElementById("messageBtn");
const messageInput = document.getElementById("messageInput");

if (navigator.mediaDevices?.getUserMedia) {
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: true,
    })
    .then((stream) => {
      userVideo.srcObject = stream;
      console.log("stream", stream);
      messageBtn.addEventListener("click", () => {
        let message = {
          type: "myMessage",
          message: messageInput.value,
        }
        if (message.type === "myMessage") {
          socket.send(message);
          let sentMessage = `<div class="sent-message">
                <div class="message">
                    <p class="message-text"><b>me:</b> ${message.message}</p>
                </div>
            </div>`
          document.getElementById("messageContainer").innerHTML += sentMessage;
        } else {
          socket.broadcast.send("message", message);
          socket.send(message.message);
        }
        messageInput.value = "";
      });
      socket.on("message", (data) => {
        let receivedMessage = `<div class="receive-message">
                <div class="message">
                    <p class="message-text"><b>anonymous:</b> ${data.message}</p>
                </div>
            </div>`
        document.getElementById("messageContainer").innerHTML += receivedMessage;
      });
    })
    .catch(function (error) {
      console.log(error);
      if (error.name === "NotAllowedError") {
        swal(
          "Permission Denied",
          "You have denied permission for camera and microphone.",
          "error"
        );
      } else {
        swal(
          "Error",
          "An error occurred while accessing camera and microphone.",
          "error"
        );
      }
    });
}
function askPermission() {
  navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
}

// function Draw(video, context) {
//   console.log(video, context);
//   context.drawImage(video, 0, 0, context.width, context.height);
//   socket.emit("stream", canvas.toDataURL("image/webp"));
// }

// socket.on("stream", (stream) => {
//   const peerConnection = new RTCPeerConnection();
//   peerConnection.addStream(stream);
//   console.log(peerConnection);
//   console.log(stream);
//   const remoteVideo = document.createElement("video");
//   remoteVideo.srcObject = stream;
//   document.getElementById("media-container").appendChild(remoteVideo);
// });
