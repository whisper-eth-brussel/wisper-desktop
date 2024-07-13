const fs = require("fs");
const { app } = require("electron");
const path = require("path");

const chatPath = path.join(app.getPath("userData"), "chat_history.json");

module.exports = {

};

// [
//   {
//     "time": "438274021424",
//     "from": "0x82498421421401240295012",
//     "message": "Hello world"
//   }
// ]