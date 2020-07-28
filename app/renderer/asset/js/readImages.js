//requiring path and fs modules
const path = require("path");
const fs = require("fs");
const directoryPath = path.join(__dirname, "/asset/images");

let img = new Promise((resolve, reject) => {
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }
    resolve(files);
  });
});

export default {
  img,
};
