const chatHistory = [];
const io = require("../socket").getIO();

console.log(chatHistory);

const addChat = (chat) => {
  console.log(chatHistory);

  chatHistory.push(chat);
  if (io) {
    io.emit("chat", chatHistory);
  }
};

const getChatHistory = () => {
  console.log(chatHistory);

  if (io) {
    io.emit("chat", chatHistory);
  }

  return chatHistory;
};

module.exports = { addChat, getChatHistory };
