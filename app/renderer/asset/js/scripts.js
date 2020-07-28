import config from "./config.js";
import getDatetime from "./hijriah.js";
import imge from "./readImages.js";
const axios = require("axios");

let dateTime = getDatetime.getDatetime();
let url = `${config.url}${dateTime.parmDate}`;
let count = 1;
let images = imge.img;
let img = [];
let countImages = 0;
let waktuSHolat = [];
images.then((val) => {
  img = val;
  document.getElementById(
    "background"
  ).src = `./asset/images/${img[countImages]}`;
});
document.getElementById("text").innerHTML = config.text;

setJadwal(url);

function setJadwal(url) {
  document.getElementById("city").innerHTML = "BOGOR";
  document.getElementById("day").innerHTML = dateTime.day;
  document.getElementById("date").innerHTML = dateTime.date;
  document.getElementById("time").innerHTML = dateTime.time;
  axios
    .get(url)
    .then((response) => {
      let waktu = response.data.jadwal.data;
      waktuSHolat = [
        waktu.subuh,
        waktu.dhuha,
        waktu.dzuhur,
        waktu.ashar,
        waktu.maghrib,
        waktu.isya,
      ];
      document.getElementById("subuh").innerHTML = waktu.subuh;
      document.getElementById("dhuha").innerHTML = waktu.dhuha;
      document.getElementById("dzuhur").innerHTML = waktu.dzuhur;
      document.getElementById("ashar").innerHTML = waktu.ashar;
      document.getElementById("maghrib").innerHTML = waktu.maghrib;
      document.getElementById("isya").innerHTML = waktu.isya;
    })
    .catch((error) => {
      console.log(error);
    });
}

setInterval(function () {
  if (count % 3 == 0) {
    document.getElementById(
      "background"
    ).src = `./asset/images/${img[countImages]}`;
    countImages++;
    if (countImages >= img.length) countImages = 0;
  }

  let dateTime = getDatetime.getDatetime();
  document.getElementById("time").innerHTML = dateTime.time;

  count++;
}, 1000);
