const chatHistory = ["asd", "qwe", "zxc"];
const io = require("../../../socket").getIO();

const addChat = (chat) => {
  chatHistory.push(chat);
  if (io) {
    io.emit("chat", chatHistory);
  }
};

const getChatHistory = () => {
  if (io) {
    io.emit("chat", chatHistory);
  }
};

module.exports = { addChat, getChatHistory };
