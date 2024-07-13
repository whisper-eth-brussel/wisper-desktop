function stringToHex(str) {
  let hex = "";
  for (let i = 0; i < str.length; i++) {
    hex += str.charCodeAt(i).toString(16).padStart(2, "0");
  }
  return hex;
}

function hexToString(hex) {
  let str = "";
  for (let i = 0; i < hex.length; i += 2) {
    let char = parseInt(hex.substr(i, 2), 16);
    str += String.fromCharCode(char);
  }
  return str;
}

module.exports = { stringToHex, hexToString };
