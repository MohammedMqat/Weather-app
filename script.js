const weatherImage = document.getElementById("weather-image");
const weatherContainer = document.getElementById("weather-container");
const searchContainer = document.getElementById("search-container");
const searchInput = document.getElementById("search-input");
const weatherInfo = document.getElementById("weather-info");
const locationEle = document.getElementById("location");
const cityName = document.getElementById("city-name");
const temperatureContainer = document.getElementById("temperature-container");
const temperature = document.getElementById("temperature");
const weatherIconContainer = document.getElementById("weather-icon-container");
const weatherIcon = document.getElementById("weather-icon");
const timeContainer = document.getElementById("time-container");
const timeEle = document.getElementById("time");
const dateEle = document.getElementById("date");

const apiKey = "";
const baseUrl = "http://api.weatherapi.com/v1";
const currentPath = "/current.json";
function fetchXHR(url, path, query, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `${url}${path}?q=${query}&key=${apiKey}`, true);
  //xhr.setRequestHeader("Authorization", `Bearer ${apiKey}`);

  xhr.onreadystatechange = () => {
    if (xhr.readyState === xhr.DONE && xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      callback(data);
    }
  };

  xhr.send();
}

fetchXHR(baseUrl, currentPath, "Gaza, Palestine", (resp) => console.log(resp));
