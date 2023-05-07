const input = document.querySelector(".input");
const lokasi = document.getElementById("lokasi");
const gambar = document.querySelector(".gambar");
const derajat = document.querySelector(".derajat");
const keterangan = document.querySelector(".keterangan");
const eror = document.querySelector(".eror");
const tengah = document.querySelector(".tengah");
const alamat = document.querySelector(".alamat");
const waktu = document.querySelector(".waktu");

input.addEventListener("keyup", (e) => {
  if (e.key == "Enter" && input.value != "") {
    checkWeather(input.value);
  }
});

async function checkWeather(city) {
  const api_key = "2f37252d1dcad3b7183a4b1e81799817";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

  const weather_data = await fetch(`${url}`).then((response) =>
    response.json()
  );

  if (weather_data.cod === "404") {
    eror.style.display = "flex";
    tengah.style.display = "none";
    console.log("eror");
    return;
  }
  eror.style.display = "none";
  tengah.style.display = "flex";

  derajat.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
  keterangan.innerHTML = `${weather_data.weather[0].description}`;
  alamat.innerHTML = `${weather_data.name}. ${weather_data.sys.country}`;

  let todayDate = new Date();
  waktu.innerHTML = dateManage(todayDate);

  console.log(weather_data);
}

function dateManage(dateArg) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let year = dateArg.getFullYear();
  let month = months[dateArg.getMonth()];
  let date = dateArg.getDate();
  let day = days[dateArg.getDay()];

  return `${day}, ${date} ${month} ${year}`;
}
