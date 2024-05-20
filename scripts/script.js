async function getData (input) {
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=cac72ffe34e344e1b5e53101241405&q=${input}`, {mode: "cors"});
        const data = await response.json()
        return data
    } catch {
        console.error("Something went wrong");
    }
}

function createDataObj (obj) {
    const dataObj = {
        temperature: obj.current.temp_f,
        name: obj.location.name,
        region: obj.location.region,
        country: obj.location.country,
        condition: obj.current.condition.text,
        weatherCode: obj.current.condition.code
    }

    return dataObj
}

function unpackData (input) {
    let weather
    const obj = getData(input);

    obj.then((data) => {
        console.log(data)
        weather = createDataObj(data)
        updateWeatherElements(weather);
    })

    return weather
}

function updateWeatherElements (weatherObj) {
    const weatherTemp = document.querySelector(".weather-temp");
    const weatherName = document.querySelector(".weather-city");
    const weatherRegion = document.querySelector(".weather-region");
    const weatherCountry = document.querySelector(".weather-country");
    const weatherCondition = document.querySelector(".weather-condition");

    weatherTemp.textContent = `${weatherObj.temperature}°`;
    weatherName.textContent = weatherObj.name;
    weatherRegion.textContent = weatherObj.region;
    weatherCountry.textContent = weatherObj.country;
    weatherCondition.textContent = weatherObj.condition

    return;
}

const area = document.querySelector("#location-input");
const areaForm = document.querySelector("form");
const main = document.querySelector("main");

areaForm.addEventListener("submit", (e) => {
    unpackData(area.value);
    e.preventDefault()
});