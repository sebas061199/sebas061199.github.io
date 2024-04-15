async function fetchWeatherData(city) {
    const apiKey = "05b0d0e9ba624593a30134856241104";
    const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&aqi=no&lang=nl`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');

        }
        const data = await response.json();
        return data;
        console.log(data)
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
        const sunny = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" style="max-width: 50px; max-height: 50px; margin-right: 10px;" stroke="orange">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
</svg>`;

const weatherDataElement = document.getElementById('weatherData');
if (conditionText === 'Zonnig') {
    weatherDataElement.innerHTML = `
        <div class="weatherData">
            ${sunny}
            <span>${temperature}</span>
            <span>°C</span>
        </div>`;
}
    })
    .catch(error => {
        console.error("Error fetching weather data:", error);
    });
