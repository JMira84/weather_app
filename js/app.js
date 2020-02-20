let long;
let lat;

let tempDescription = document.querySelector('.temperature-description');
let tempDegree = document.querySelector('.temperature-degree');
let locationTimeZone = document.querySelector('.location-timezone');

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

                // Set DOM Elements from the API
                tempDegree.textContent = temperature;
                tempDescription.textContent = summary;
                locationTimeZone.textContent = data.timezone;

                // Set Icon
                setIcons(icon, WEATHER_ICON);
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
    SKY_CONS.play();
    return SKY_CONS.set(iconID, Skycons[CURRENT_ICON]);
}