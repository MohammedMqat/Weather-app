const weatherImage = document.getElementById("weather-image");
const weatherContainer = document.getElementById("weather-container");
const searchContainer = document.getElementById("search-container");
const searchForm = document.getElementById("search-form");
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
const searchPath = "/search.json";
function fetchXHR(url, path, query, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `${url}${path}?q=${query}&key=${apiKey}`, true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === xhr.DONE && xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      callback(data);
    }
  };

  xhr.send();
}

const searchInput = document.getElementById("search-input");
const autocompleteList = document.getElementById("autocomplete-list");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const query = formData.get("query");
  autocompleteList.classList.add("hidden");
  fetchXHR(baseUrl, currentPath, query, updateUI);
});

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const renderSuggestions = (results) => {
  autocompleteList.innerHTML = "";
  if (!results || results.length === 0) {
    autocompleteList.classList.add("hidden");
    return;
  }
  results.forEach((place) => {
    const li = document.createElement("li");
    li.textContent = `${place.name}, ${place.region}, ${place.country}`;
    li.addEventListener("mousedown", () => {
      searchInput.value = place.name;
      autocompleteList.classList.add("hidden");
      fetchXHR(baseUrl, currentPath, place.name, updateUI);
    });
    autocompleteList.appendChild(li);
  });
  autocompleteList.classList.remove("hidden");
};

searchInput.addEventListener(
  "input",
  debounce(() => {
    const query = searchInput.value.trim();
    if (query.length < 3) {
      autocompleteList.classList.add("hidden");
      return;
    }
    fetchXHR(baseUrl, searchPath, query, renderSuggestions);
  }, 300)
);

searchInput.addEventListener("blur", () => {
  autocompleteList.classList.add("hidden");
});

const updateUI = (weatherData) => {
  console.log(weatherData);
  temperature.textContent = weatherData.current.temp_c;
  timeEle.textContent = weatherData.current.last_updated;
  locationEle.textContent = weatherData.location.name;
  cityName.textContent = weatherData.location.name;
  weatherIcon.src = weatherData.current.condition.icon;
};

fetchXHR(baseUrl, currentPath, "Gaza, Palestine", updateUI);
(resp) => resp;
