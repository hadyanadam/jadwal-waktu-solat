import config from "./config.js";
const axios = require('axios')

let dateTime = getDatetime();
let url = `${config.url}${dateTime.parmDate}`;
console.log(url)
document.getElementById('city').innerHTML = "BOGOR"
document.getElementById('day').innerHTML = dateTime.day
document.getElementById('date').innerHTML = dateTime.date
document.getElementById('time').innerHTML = dateTime.time
setJadwal(url);
function setJadwal(url) {
  axios.get(url)
    .then (response => {
      let waktu = response.data.jadwal
      document.getElementById('subuh').innerHTML = waktu.subuh
      document.getElementById('dhuha').innerHTML = waktu.dhuha
      document.getElementById('dzuhur').innerHTML = waktu.dzuhur
      document.getElementById('ashar').innerHTML = waktu.ashar
      document.getElementById('maghrib').innerHTML = waktu.maghrib
      document.getElementById('isya').innerHTML = waktu.isya
    })
    .catch (error => {
      console.log(error)
    })
}

function getDatetime() {
  function formatDatetime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  let datetime = new Date();
  let days = ["MINGGU", "SENIN", "SELASA", "RABU", "KAMIS", "JUMAT", "SABTU"];
  let month = [
    "JANUARI",
    "FEBRUARI",
    "MARET",
    "APRIL",
    "MEI",
    "JUNI",
    "JULI",
    "AGUSTUS",
    "SEPTEMBER",
    "OKTOBER",
    "NOVEMBER",
    "DESEMBER",
  ];
  let D = days[datetime.getDay()];
  let d = formatDatetime(datetime.getDate());
  let M = month[datetime.getMonth()];
  let MM = formatDatetime(datetime.getMonth());
  let y = datetime.getFullYear();
  let h = formatDatetime(datetime.getHours());
  let m = formatDatetime(datetime.getMinutes());
  let s = formatDatetime(datetime.getSeconds());

  let time = `${h}:${m}:${s}`;
  let date = `${d} ${M} ${y}`;
  let parmDate = `${y}-${MM}-${d}`;

  return {
    time: time,
    date: date,
    day: D,
    parmDate: parmDate,
  };
}

setInterval(function () {
  let time = getDatetime();
  // $("#time").text(time.time);
  document.getElementById('time').innerHTML = time.time
}, 1000)
