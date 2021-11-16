import axios from "axios";
let currentTime = new Date();
console.log(currentTime);

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()];
console.log(day);

let hours = currentTime.getHours();
console.log(hours);

let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = "0".concat(minutes);
}
console.log(Math.round(minutes * 100) / 100);

function displayTime() {
  let h4 = document.querySelector("h4");
  h4.innerHTML = `${day} ${hours}:${minutes}`;
}

displayTime();

function onClick(event) {
  event.preventDefault();
  let input = document.querySelector("#searchId");
  console.log(input.value);

  let h3 = document.querySelector("h3");
  h3.innerHTML = input.value;
}

let form = document.querySelector("form");
form.addEventListener("submit", onClick);
console.log(form);

function displayWeatherCondition(response) {
  console.log(response.data);
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
}

function searchCity(city) {
  let apiKey = "fef90cf423cdd1a82c0f177876085211";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function inputCity(event) {
  event.preventDefault();

  let city = document.querySelector("#searchId").value;
  searchCity(city);
}

//current location button

function searchLocation(position) {
  let apiKey = "fef90cf423cdd1a82c0f177876085211";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let submit = document.querySelector("#cityForm");
submit.addEventListener("submit", inputCity);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("London");
