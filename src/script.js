function formatTime(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  return `${day} | ${hours}: ${minutes}`;
}
let datum = document.querySelector("#current-date");
let currentTime = new Date();
let searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", search);
datum.innerHTML = formatTime(currentTime);

function showTemperature(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  let temp = Math.round(response.data.main.temp);
  let position = document.querySelector("#temperature");
  position.innerHTML = `${temp}°`;
}

function search(event) {
  event.preventDefault();
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let city = document.querySelector("#search-input").value;
  let apiKey = "a921daf97c39af523ba6c55cc2fd35f9";
  let units = "metric";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  let cityElement = document.querySelector("#current-city");
  let cityInput = document.querySelector("#search-input");
  cityElement.innerHTML = cityInput.value;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature);
}

function showCurrentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "a921daf97c39af523ba6c55cc2fd35f9";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

navigator.geolocation.getCurrentPosition(showCurrentPosition);

let currentLocationBtn = document.querySelector("#button-current-location");
currentLocationBtn.addEventListener("click", showCurrentPosition);
