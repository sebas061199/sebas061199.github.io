async function fetchWeatherData(city) {
    const apiKey = '05b0d0e9ba624593a30134856241104';
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&aqi=no&lang=nl`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was a problem fetching the weather data:', error);
    }
}


// Example usage:
const city = "Amersfoort";
fetchWeatherData(city)
    .then(data => {
        console.log(city, ":", data);
        const temperature = data.current.temp_c;
        const conditionText = data.current.condition.text;

        const weatherTempElement = document.getElementById('weatherTemp');

        weatherTempElement.textContent = `${temperature}°C`;

        if (conditionText === 'Zonnig') {
            const weatherIcon = document.getElementById('weatherIcon');
            weatherIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
    style="max-width: 50px; max-height: 50px; margin-right: 10px;" stroke="orange">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
  </svg>`
        }
        if (conditionText === 'Geheel bewolkt') {
            const weatherIcon = document.getElementById('weatherIcon');
            weatherIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"  style="max-width: 50px; max-height: 50px; margin-right: 10px;" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
          </svg>
          `
        }
        if (conditionText === 'Gedeeltelijk bewolkt') {
            const weatherIcon = document.getElementById('weatherIcon');
            weatherIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"  style="max-width: 50px; max-height: 50px; margin-right: 10px;" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
          </svg>`
        }
        if (conditionText === 'Lichte regen') {
            const weatherIcon = document.getElementById('weatherIcon');
            weatherIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" style="max-width: 50px; max-height: 50px; margin-right: 10px;" viewBox="0 0 512 512"><path d="M114.61 162.85A16.07 16.07 0 00128 149.6C140.09 76.17 193.63 32 256 32c57.93 0 96.62 37.75 112.2 77.74a15.84 15.84 0 0012.2 9.87c50 8.15 91.6 41.54 91.6 99.59 0 59.4-48.6 100.8-108 100.8H130c-49.5 0-90-24.7-90-79.2 0-48.47 38.67-72.22 74.61-77.95z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M144 384l-32 48M224 384l-64 96M304 384l-32 48M384 384l-64 96"/></svg>`
        }
        if (conditionText === 'Mist') {
            const weatherIcon = document.getElementById('weatherIcon');
            weatherIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"  style="max-width: 50px; max-height: 50px; margin-right: 10px;" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
          </svg>
          `
        }
        if (conditionText === 'Normale of zware sneeuw in gebied met onweer') {
            const weatherIcon = document.getElementById('weatherIcon');
            weatherIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M120 352l-24 48M136 432l-16 32M400 352l-24 48M416 432l-16 32M208 304l-16 96h48v80l80-112h-48l16-64M404.33 152.89H392.2C384.71 84.85 326.14 32 256 32a136.39 136.39 0 00-128.63 90.67h-4.57c-49.94 0-90.8 40.8-90.8 90.66h0C32 263.2 72.86 304 122.8 304h281.53C446 304 480 270 480 228.44h0c0-41.55-34-75.55-75.67-75.55z"/></svg>`
        }
        if (conditionText === 'Normale regen') {
            const weatherIcon = document.getElementById('weatherIcon');
            weatherIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" style="max-width: 50px; max-height: 50px; margin-right: 10px;" viewBox="0 0 512 512"><path d="M114.61 162.85A16.07 16.07 0 00128 149.6C140.09 76.17 193.63 32 256 32c57.93 0 96.62 37.75 112.2 77.74a15.84 15.84 0 0012.2 9.87c50 8.15 91.6 41.54 91.6 99.59 0 59.4-48.6 100.8-108 100.8H130c-49.5 0-90-24.7-90-79.2 0-48.47 38.67-72.22 74.61-77.95z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M144 384l-32 48M224 384l-64 96M304 384l-32 48M384 384l-64 96"/></svg>`
        }




    })
    .catch(error => {
        console.error("Error fetching weather data:", error);
    });
