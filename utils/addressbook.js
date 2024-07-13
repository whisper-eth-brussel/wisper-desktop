const fs = require("fs");
const path = require("path");
const { app } = require("electron");
const os = require("os");

const addressBookPath = path.join(app.getPath("userData"), "addressBook.txt");

function getSelfIp() {
  return os.networkInterfaces().en0[0].address;
}

function getAddressBook(callback) {
  fs.readFile(addressBookPath, "utf8", (err, data) => {
    if (err) {
      return callback(err, null);
    }

    return callback(null, data);
  });
}

function updateAddressBook(addressBook, callback) {
  fs.writeFile(addressBookPath, JSON.stringify(addressBook), (err) => {
    if (err) {
      return callback(err);
    }

    return callback(null);
  });
}

module.exports = {
  getSelfIp,
  getAddressBook,
  updateAddressBook,
};
