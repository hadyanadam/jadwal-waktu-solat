function isGregLeapYear(year) {
  return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}

function gregToFixed(year, month, day) {
  let a = Math.floor((year - 1) / 4);
  let b = Math.floor((year - 1) / 100);
  let c = Math.floor((year - 1) / 400);
  let d = Math.floor((367 * month - 362) / 12);
  let e;

  if (month <= 2) e = 0;
  else if (month > 2 && isGregLeapYear(year)) e = -1;
  else e = -2;

  return 1 - 1 + 365 * (year - 1) + a - b + c + d + e + day;
}

function Hijri(year, month, day) {
  this.year = year;
  this.month = month;
  this.day = day;
  this.toFixed = hijriToFixed;
  this.toString = hijriToString;
}

function hijriToFixed() {
  return (
    this.day +
    Math.ceil(29.5 * (this.month - 1)) +
    (this.year - 1) * 354 +
    Math.floor((3 + 11 * this.year) / 30) +
    227015 -
    1
  );
}

function hijriToString() {
  let months = [
    "Muharram",
    "Safar",
    "Rabiul Awwal",
    "Rabiul Tsani",
    "Jumadil Ula",
    "Jumadil Tsani",
    "Rajab",
    "Sya'ban",
    "Ramadhan",
    "Syawwal",
    "Dzul Qa'dah",
    "Dzul Hijjah",
  ];
  return (
    formatDatetime(this.day) + " " + months[this.month - 1] + " " + this.year
  );
}

function fixedToHijri(f) {
  let i = new Hijri(1100, 1, 1);
  i.year = Math.floor((30 * (f - 227015) + 10646) / 10631);
  let i2 = new Hijri(i.year, 1, 1);
  let m = Math.ceil((f - 29 - i2.toFixed()) / 29.5) + 1;
  i.month = Math.min(m, 12);
  i2.year = i.year;
  i2.month = i.month;
  i2.day = 1;
  i.day = f - i2.toFixed() + 1;
  return i;
}

let weekday = ["Ahad", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
let monthname = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

function formatDatetime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function getDatetime() {
  let tod = new Date();
  let D = weekday[tod.getDay()]; //hari ahad
  let d = tod.getDate(); //hari 0
  let M = monthname[tod.getMonth()]; //bulan Januari
  let m = tod.getMonth(); //bulan 0
  let y = tod.getFullYear(); //tahun 2020
  let h = formatDatetime(tod.getHours()); //jam 01
  let min = formatDatetime(tod.getMinutes()); //menit 01
  let s = formatDatetime(tod.getSeconds()); //detik 01

  m++;
  let fixd = gregToFixed(y, m, d);
  let hijriah = fixedToHijri(fixd);

  let time = `${h}:${min}:${s}`;
  let date = `${formatDatetime(d)} ${M} ${y}`;
  let parmDate = `${y}-${formatDatetime(m)}-${formatDatetime(d)}`;

  return {
    time: time,
    date: date,
    day: D,
    parmDate: parmDate,
    hijriah: hijriah.toString(),
  };
}

export default {
  getDatetime,
};
