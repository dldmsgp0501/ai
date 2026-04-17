
    // 여기에 본인의 OpenWeather API Key를 직접 넣어주세요.
    const API_KEY = "8e888afe250816d2d73ee42d6262ae5c";

    // 현재 날씨 API
    const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";

    // 지오코딩 API
    const GEO_URL = "https://api.openweathermap.org/geo/1.0/direct";

    // 대기질 API (오존 포함)
    const AIR_URL = "https://api.openweathermap.org/data/2.5/air_pollution";

    const searchForm = document.getElementById("searchForm");
    const cityInput = document.getElementById("cityInput");
    const locationBtn = document.getElementById("locationBtn");
    const statusText = document.getElementById("statusText");
    const weatherCard = document.getElementById("weatherCard");

    const cityNameEl = document.getElementById("cityName");
    const weatherDescEl = document.getElementById("weatherDesc");
    const tempEl = document.getElementById("temp");
    const windSpeedEl = document.getElementById("windSpeed");
    const humidityEl = document.getElementById("humidity");
    const feelsLikeEl = document.getElementById("feelsLike");
    const ozoneEl = document.getElementById("ozone");

    function setStatus(message, isError = false) {
      statusText.textContent = message;
      statusText.classList.toggle("error", isError);
    }

    function setLoading(isLoading) {
      weatherCard.classList.toggle("loading", isLoading);
    }

    function validateApiKey() {
      if (!API_KEY || API_KEY === "YOUR_OPENWEATHER_API_KEY") {
        setStatus("API Key를 먼저 입력해주세요.", true);
        return false;
      }
      return true;
    }

    function formatNumber(value, digits = 0) {
      if (typeof value !== "number" || Number.isNaN(value)) return "--";
      return value.toFixed(digits);
    }

    function getWeatherEmoji(main, id) {
      // OpenWeather 'main' 기준 간단 매핑
      if (main === "Clear") return "☀️";
      if (main === "Clouds") return "☁️";
      if (main === "Rain") return "🌧️";
      if (main === "Drizzle") return "🌦️";
      if (main === "Thunderstorm") return "⛈️";
      if (main === "Snow") return "❄️";
      if (main === "Mist" || main === "Fog" || main === "Haze" || main === "Smoke") return "🌫️";
      if (main === "Dust" || main === "Sand" || main === "Ash") return "🌪️";
      // 세부 코드 보정 (가끔 main이 애매할 때)
      if (id >= 200 && id < 300) return "⛈️";
      if (id >= 300 && id < 400) return "🌦️";
      if (id >= 500 && id < 600) return "🌧️";
      if (id >= 600 && id < 700) return "❄️";
      if (id >= 700 && id < 800) return "🌫️";
      if (id === 800) return "☀️";
      if (id > 800) return "☁️";
      return "🌈";
    }

    function updateWeatherUI(weatherData, ozoneValue) {
      const city = weatherData.name || "도시명";
      const country = weatherData.sys?.country ? `, ${weatherData.sys.country}` : "";
      const weatherObj = weatherData.weather?.[0] || {};
      const description = weatherObj.description || "날씨 정보 없음";
      const main = weatherObj.main || "";
      const id = weatherObj.id;
      const emoji = getWeatherEmoji(main, id);
      const temp = weatherData.main?.temp;
      const feelsLike = weatherData.main?.feels_like;
      const humidity = weatherData.main?.humidity;
      const windSpeed = weatherData.wind?.speed;

      cityNameEl.textContent = `${city}${country}`;
      weatherDescEl.textContent = `${emoji} ${description}`;
      tempEl.textContent = `${formatNumber(temp, 0)}°`;
      windSpeedEl.innerHTML = `${formatNumber(windSpeed, 2)} <span class="unit">m/s</span>`;
      humidityEl.innerHTML = `${formatNumber(humidity, 0)} <span class="unit">%</span>`;
      feelsLikeEl.innerHTML = `${formatNumber(feelsLike, 0)} <span class="unit">°C</span>`;
      ozoneEl.innerHTML = `${formatNumber(ozoneValue, 0)} <span class="unit">ug/m2</span>`;
    }

    async function fetchAirPollution(lat, lon) {
      const url = `${AIR_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("대기질 정보를 불러오지 못했습니다.");
      }

      const data = await response.json();
      return data.list?.[0]?.components?.o3 ?? null;
    }

    async function fetchWeatherByCoords(lat, lon, labelText = "현재 위치") {
      if (!validateApiKey()) return;

      setLoading(true);
      setStatus(`${labelText}의 날씨 정보를 불러오는 중입니다...`);

      try {
        const weatherUrl = `${WEATHER_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`;
        const weatherResponse = await fetch(weatherUrl);

        if (!weatherResponse.ok) {
          throw new Error("날씨 정보를 가져오지 못했습니다.");
        }

        const weatherData = await weatherResponse.json();

        let ozoneValue = null;
        try {
          ozoneValue = await fetchAirPollution(lat, lon);
        } catch (airError) {
          ozoneValue = null;
        }

        updateWeatherUI(weatherData, ozoneValue);
        setStatus(`${weatherData.name} 날씨 정보를 불러왔습니다.`);
      } catch (error) {
        setStatus(error.message || "요청 처리 중 오류가 발생했습니다.", true);
      } finally {
        setLoading(false);
      }
    }

    async function fetchWeatherByCity(city) {
      if (!validateApiKey()) return;

      const trimmedCity = city.trim();
      if (!trimmedCity) {
        setStatus("도시명을 입력해주세요.", true);
        cityInput.focus();
        return;
      }

      setLoading(true);
      setStatus(`${trimmedCity}의 좌표를 찾는 중입니다...`);

      try {
        const geoResponse = await fetch(`${GEO_URL}?q=${encodeURIComponent(trimmedCity)}&limit=1&appid=${API_KEY}`);

        if (!geoResponse.ok) {
          throw new Error("도시 정보를 찾지 못했습니다.");
        }

        const geoData = await geoResponse.json();

        if (!Array.isArray(geoData) || geoData.length === 0) {
          throw new Error("입력한 도시를 찾을 수 없습니다.");
        }

        const { lat, lon, name, country } = geoData[0];
        await fetchWeatherByCoords(lat, lon, `${name}${country ? ` (${country})` : ""}`);
      } catch (error) {
        setStatus(error.message || "도시 검색 중 오류가 발생했습니다.", true);
      } finally {
        setLoading(false);
      }
    }

    function getCurrentLocationWeather() {
      if (!validateApiKey()) return;

      if (!navigator.geolocation) {
        setStatus("이 브라우저에서는 위치 조회를 지원하지 않습니다.", true);
        return;
      }

      setStatus("현재 위치를 확인하는 중입니다...");

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude, "현재 위치");
        },
        (error) => {
          let message = "위치 정보를 가져오지 못했습니다.";

          if (error.code === 1) {
            message = "위치 권한이 거부되었습니다.";
          } else if (error.code === 2) {
            message = "현재 위치를 확인할 수 없습니다.";
          } else if (error.code === 3) {
            message = "위치 확인 시간이 초과되었습니다.";
          }

          setStatus(message, true);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    }

    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      fetchWeatherByCity(cityInput.value);
    });

    locationBtn.addEventListener("click", getCurrentLocationWeather);

    cityInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        fetchWeatherByCity(cityInput.value);
      }
    });

    // 입력창 클릭 시 기존 데이터 초기화
    function resetUI() {
      cityInput.value = "";
      cityNameEl.textContent = "도시명";
      weatherDescEl.textContent = "날씨 정보가 여기에 표시됩니다.";
      tempEl.textContent = "--°";
      windSpeedEl.innerHTML = "-- <span class=\"unit\">m/s</span>";
      humidityEl.innerHTML = "-- <span class=\"unit\">%</span>";
      feelsLikeEl.innerHTML = "-- <span class=\"unit\">°C</span>";
      ozoneEl.innerHTML = "-- <span class=\"unit\">ug/m2</span>";
      setStatus("도시명을 입력해주세요.");
    }

    cityInput.addEventListener("focus", resetUI);
