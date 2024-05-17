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
        console.log(weather.temperature)
        console.log(weather.name, weather.region, weather.country, weather.condition);
    })

    return weather
}

const area = document.querySelector("#location-input");
const areaForm = document.querySelector("form");

areaForm.addEventListener("submit", (e) => {
    unpackData(area.value);
    e.preventDefault()
});