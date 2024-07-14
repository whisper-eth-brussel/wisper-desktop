let io;

module.exports = {
  init: (httpServer) => {
    io = require("socket.io")(httpServer, {
      cors: {
        origin: "*",
      },
    });
    console.log(io);
    io.on("connection", (socket) => {
      console.log("Client connected, ", socket);
    });
  },
  getIO: () => io
};
