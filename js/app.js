let long;
let lat;

let tempDescription = document.querySelector('.temperature-description p');
let tempDegree = document.querySelector('.temperature-degree');
let locationTimeZone = document.querySelector('.location-timezone');

const BODY = document.querySelector('body');

const WEATHER_ICON = document.querySelector('.icon');

const INFO_MSG = document.querySelector('.info-msg');

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        long = position.coords.longitude;
        lat = position.coords.latitude;

        const proxy = 'https://cors-anywhere.herokuapp.com/';

        const api = `${proxy}https://api.darksky.net/forecast/d050c3beca6a34613e874733945539e7/${lat},${long}`;

        fetch(api)
            .then(data => {
                return data.json();
            })
            .then(data => {
                console.log(data);
                
                const { temperature, summary, icon } = data.currently;

                const CELSIUS = (temperature - 32) * (5 / 9);

                // Set DOM Elements from the API
                tempDegree.textContent = temperature;
                tempDescription.textContent = summary;
                locationTimeZone.textContent = data.timezone;

                // Set Icon
                setIcons(icon, WEATHER_ICON);

                // Change temp
                changeTemp(CELSIUS, temperature);

                if (temperature >= 71.6) {
                    BODY.classList.add('hot');
                } else if (temperature >= 60.8 && temperature < 71.6) {
                    BODY.classList.add('moderate');
                } else {
                    BODY.classList.add('cold');
                }
            });
    });
} else {
    INFO_MSG.classList.add('show');
    INFO_MSG.textContent = 'Para veres a temperatura no teu fuso horário, activa o serviço de localização.'
}

function setIcons(icon, iconID) {
    const SKY_CONS = new Skycons({ color: 'white' });
    // Look for every line, and when it founds everyline replaces it for underscore
    const CURRENT_ICON = icon.replace(/-/g, '_').toUpperCase();
    // Animate Icon
    SKY_CONS.play();
    return SKY_CONS.set(iconID, Skycons[CURRENT_ICON]);
}

const TEMP_SECTION = document.querySelector('.degree-section');
const TEMP_SPAN = document.querySelector('.degree-section span');

function changeTemp(celsius, temperature) {
    // Change temperature to Celsius/Fahrenheit
    TEMP_SECTION.addEventListener('click', () => {
        if (TEMP_SPAN.textContent === 'F') {
            TEMP_SPAN.textContent = 'ºC';
            tempDegree.textContent = Math.floor(celsius);
        } else {
            TEMP_SPAN.textContent = 'F';
            tempDegree.textContent = temperature;
        }
    });
}