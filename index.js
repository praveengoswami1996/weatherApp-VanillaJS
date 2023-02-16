const API_Key= "4783f6be90c74c4c45107bcf6d95d5b7";

//Default Weather Data on Page Load
window.addEventListener('load', () => {
    fetchWeather('delhi');
});

//Setting an event listener on input element
document.getElementById('searchbar').addEventListener('keypress', (event) => {
    if (event.key == 'Enter') {
        event.preventDefault();

        fetchWeather(document.getElementById('searchbar').value);
    }
});

//Setting an event listener on button element
document.getElementById('btn').addEventListener('click', (event) => {
    event.preventDefault();
    fetchWeather(document.getElementById('searchbar').value);
});

function fetchWeather(locationName) {
    const promiseObj = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locationName}&units=metric&appid=${API_Key}`);

    promiseObj.then(
        (response) => {
            if (!response.ok) {
                throw Error('Sorry!! Could not fetch the weather data.')
            } 
            return response.json(); 
        }
    ).then(
        (data) => displayWeather(data)
    ).catch(
        (error) => alert(error)
    )
}

function displayWeather(data) {
    const { name } = data;
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    const { icon, description } = data.weather[0];
    
    document.querySelector('#city').innerText = `Weather in ${name}`;
    document.querySelector('#temperature').innerText = `${temp}ºC`;
    document.querySelector('#icon').src = `https://openweathermap.org/img/wn/${icon}.png`;
    document.querySelector('#weathertype').innerText = description;
    document.querySelector('#humidity').innerText = `Humidity: ${humidity}%`;
    document.querySelector('#windspeed').innerText = `Wind Speed: ${speed} km/h`;;
     
}