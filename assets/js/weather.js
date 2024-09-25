const apiKey = "e5c02fcd2a27c0d23c1d78d8260f0376";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const mapURL = "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d!2d";
const countryName = "https://restcountries.com/v3.1/alpha/";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const mapIden = document.querySelector(".map");

// Preloaded location
checkWeather("Butuan");

async function checkWeather(city) {
    const response = await fetch(apiURL + city + `&appid=` + apiKey);

    if(response.status == 404) 
    {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".map").style.display = "none";
    } 
    else 
    {
        var data = await response.json();

        mapIden.src = mapURL + data.coord.lon + '!3d' + data.coord.lat + '!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOMKwNTYnNTcuMSJOIDEyNcKwMzInMzcuMCJF!5e0!3m2!1sen!2sph!4v1707185850993!5m2!1sen!2sph'; // Display Map

        document.querySelector(".city").textContent = data.name; // Name of the city
        document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°C"; // Temperature
        document.querySelector(".humidity").textContent = data.main.humidity + "%"; // Humidity
        document.querySelector(".wind").textContent = data.wind.speed + " kph"; // Wind speed

        /*  Country code fetch   */
        const country = await fetch(countryName + data.sys.country);
        if(country.status == 404) {
            document.querySelector(".country").style.display = "none";
        } 
        else {
            var name = await country.json();
            document.querySelector(".country").textContent = name.name.official;
        }
        
        if(data.weather[0].main == "Clouds") {
            weatherIcon.src = "assets/img/weather/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "assets/img/weather/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "assets/img/weather/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "assets/img/weather/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "assets/img/weather/mist.png";
        } else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "assets/img/weather/snow.png";
        }
        
        document.querySelector(".card").style.display = "block"
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".map").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}
searchBtn.addEventListener("click", ()=>{checkWeather(searchBox.value);
})
