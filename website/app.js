/* Global Variables */
const key = 'bec924968d3229ad57b29bcfa721be83';
const baseUrl = 'api.openweathermap.org/data/2.5/weather?';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

function convertKelvinToCelsius(kelvin) {
    return kelvin - 273.15;
}

const generate = document.getElementById('generate');
generate.addEventListener('click', function(e) {
    const city = document.getElementById('city').value;
    const country = document.getElementById('country').value;
    const feelings = document.getElementById('feelings').value;
    console.log(`Generate button clicked. 
    City: ${city}
    Feeling: ${feelings}`);

    weatherData = getWeather(baseUrl, key, city, country)
        .then((weatherData) => {
            const temperature = convertKelvinToCelsius(weatherData.main.temp);
            postWeather('/post', { temperature, newDate, feelings })
        })
        .then(() => {
            updateUI();
        })
})

const getWeather = async(baseUrl, key, city, country) => {
    // let fullUrl = `http://${baseUrl}q=${city},${country}&appid=${key}`;
    let fullUrl = `http://${baseUrl}q=${city}&appid=${key}`;
    const request = await fetch(fullUrl);

    try {
        const data = await request.json();
        return data;
    } catch (error) {
        console.log("error:", error);
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
    await console.log("updateUI");

    const request = await fetch('/get');

    try {
        const data = await request.json();
        // console.log(data);
        let latest = data.length - 1;

        document.getElementById('date').innerText = data[latest]['date'];
        document.getElementById('temp').innerText = data[latest]['temperature'];
        document.getElementById('content').innerText = data[latest]['content'];
    } catch (error) {
        console.log("error", error);
    }
}







document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded");
})