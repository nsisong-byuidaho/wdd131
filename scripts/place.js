const temp = parseInt(document.querySelector("#current-temp").textContent);
const wind = parseInt(document.querySelector("#windspeed").textContent);
const wc = document.querySelector("#windchill");

function calculateWindchill(temp, wind) {
    return Math.round(13.12 + 0.6215 * temp - 11.37 * Math.pow(wind, 0.16) + 0.4275 * temp * Math.pow(wind, 0.16));
}

if (temp <= 10 && wind > 4.8) {
    wc.innerHTML = `${calculateWindchill(temp, wind)}&deg; C`;
}
else {
    wc.innerHTML = "N/A";
}