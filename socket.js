let io;

module.exports = {
  init: (httpServer) => {
    const socket = require("socket.io")(httpServer, {
      cors: {
        origin: "*",
      },
    });

    io = socket;
    socket.on("connection", (socket) => {
      console.log("Client connected,  ");
    });
  },
  getIO: () => io,
};
