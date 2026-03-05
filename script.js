function getWeather() {
    const city = document.getElementById("cityInput").value;
    const apiKey = "19eb48620debc187b2ef04f57ec95d1e"; // Replace with your actual API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error("City not found 😢");
        }
        return response.json();
      })
      .then(data => {
        setBackground(data.weather[0].main); // Set dynamic background
        const iconCode = data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
        const emoji = getWeatherEmoji(data.weather[0].main);
  
        const weatherInfo = `
          <h2>${data.name}, ${data.sys.country}</h2>
          <img src="${iconUrl}" class="weather-icon" />
          <p>${emoji} ${data.weather[0].description}</p>
          <p>🌡 Temp: <strong>${data.main.temp} °C</strong></p>
          <p>💧 Humidity: ${data.main.humidity}%</p>
          <p>🌬 Wind: ${data.wind.speed} m/s</p>
        `;
        document.getElementById("weatherInfo").innerHTML = weatherInfo;
      })
      .catch(error => {
        document.getElementById("weatherInfo").innerHTML = `<p>${error.message}</p>`;
      });
  }
  
  function getWeatherEmoji(condition) {
    switch (condition.toLowerCase()) {
      case 'clouds': return '☁️';
      case 'clear': return '☀️';
      case 'rain': return '🌧️';
      case 'snow': return '❄️';
      case 'thunderstorm': return '⛈️';
      case 'drizzle': return '🌦️';
      case 'mist': return '🌫️';
      default: return '🌡️';
    }
  }
  
  function setBackground(weather) {
    const body = document.body;
    switch (weather.toLowerCase()) {
      case 'clear':
        body.style.background = "linear-gradient(to right, #fceabb, #f8b500)";
        break;
      case 'clouds':
        body.style.background = "linear-gradient(to right, #bdc3c7, #2c3e50)";
        break;
      case 'rain':
        body.style.background = "linear-gradient(to right, #667db6, #0082c8)";
        break;
      case 'snow':
        body.style.background = "linear-gradient(to right, #e6dada, #274046)";
        break;
      default:
        body.style.background = "linear-gradient(-45deg, #74ebd5, #ACB6E5)";
    }
  }
  
  function voiceSearch() {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();
  
    recognition.onresult = function (event) {
      const city = event.results[0][0].transcript;
      document.getElementById("cityInput").value = city;
      getWeather();
    };
  }
  
  function getMyLocation() {
    const apiKey = "19eb48620debc187b2ef04f57ec95d1e"; // Replace with your key
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      
      fetch(url)
        .then(response => response.json())
        .then(data => {
          setBackground(data.weather[0].main);
          const iconCode = data.weather[0].icon;
          const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
          const emoji = getWeatherEmoji(data.weather[0].main);
  
          const weatherInfo = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <img src="${iconUrl}" class="weather-icon" />
            <p>${emoji} ${data.weather[0].description}</p>
            <p>🌡 Temp: <strong>${data.main.temp} °C</strong></p>
            <p>💧 Humidity: ${data.main.humidity}%</p>
            <p>🌬 Wind: ${data.wind.speed} m/s</p>
          `;
          document.getElementById("weatherInfo").innerHTML = weatherInfo;
        });
    });
  }
  
  function toggleTheme() {
    document.body.classList.toggle("dark");
  }
  