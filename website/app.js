/* Global Variables */
const key = 'bec924968d3229ad57b29bcfa721be83';
const baseUrl = 'api.openweathermap.org/data/2.5/weather?';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();

function convertKelvinToCelsius(kelvin) {
    return kelvin - 273.15;
}



const getWeather = async(baseUrl, key, city) => {
    let fullUrl = `http://${baseUrl}q=${city}&appid=${key}`;
    const request = await fetch(fullUrl);

    try {
        const data = await request.json();
        return data;
    } catch (error) {
        console.log("getWeather error:", error);
    }
}


const postWeather = async(url, data) => {
    await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            date: data['newDate'],
            temperature: data['temperature'],
            content: data['feelings']
        })
    })
}


const updateUI = async() => {
    const request = await fetch('/get');

    try {
        const data = await request.json();
        let latest = data.length - 1;

        document.getElementById('date').innerText = data[latest]['date'];
        document.getElementById('temp').innerText = data[latest]['temperature'];
        document.getElementById('content').innerText = data[latest]['content'];
    } catch (error) {
        console.log("updateUI error", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate');

    generateBtn.addEventListener('click', function(e) {
        const city = document.getElementById('city').value;
        const feelings = document.getElementById('feelings').value;

        weatherData = getWeather(baseUrl, key, city)
            .then((weatherData) => {
                const temperature = Math.round(convertKelvinToCelsius(weatherData.main.temp)).toString() + "C";

                postWeather('/post', { temperature, newDate, feelings })
            })
            .then(() => {
                updateUI();
            })
    })
})