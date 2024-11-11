const weatherform=document.querySelector(".weatherform");
const cityinput=document.querySelector(".city_input");
const card=document.querySelector(".card");
const apikey="844378bb1419d18e0dae87100cebde10";

weatherform.addEventListener("submit",async event=>
{
event.preventDefault();
const city=cityinput.value.trim();
if(city){
try{
    const weatherdata= await getweatherdata(city);
    displayweatherinfo(weatherdata);
}
catch(error){
    console.log(error);
    displayerror("Error:Could not fetch data !");
}
}
else{
    displayerror("Please Enter a city")
}
}
);

async function getweatherdata(city){
const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
const response=await fetch(apiurl);
if(!response.ok){
    throw new error("could not fetch weather data")
}

return await response.json();
}


function displayweatherinfo(data){
let {name:city,
      main:{temp,humidity},
      weather :[{description , id}] }= data;


card.textContent="";
card.style.display="flex";

const citydisplay=document.createElement("h3");
const tempdisplay=document.createElement("p");
const humiditydisplpay=document.createElement("p");
const descdisplay=document.createElement("p");
const weatheremoji=document.createElement("p");

citydisplay.textContent=city;
tempdisplay.textContent=`${(temp - 273.15).toFixed(2)}°C`;
humiditydisplpay.textContent=`Humidity: ${humidity}%`;
descdisplay.textContent=description;
weatheremoji.textContent=getweatheremoji(id);

card.appendChild(citydisplay);
citydisplay.classList.add("cityname");
card.appendChild(tempdisplay);
tempdisplay.classList.add("tempdisplay");
card.appendChild(humiditydisplpay);
humiditydisplpay.classList.add("humiditydisplay");
card.appendChild(descdisplay);
descdisplay.classList.add("descdisplay");
card.appendChild(weatheremoji);
weatheremoji.classList.add("weatheremoji");



}


function getweatheremoji(weatherid){
    switch(true){
        case (weatherid >= 200 && weatherid < 300):
            return "🌩️";  // Thunderstorms
        case (weatherid >= 300 && weatherid < 400):
            return "🌧️";  // Drizzle
        case (weatherid >= 500 && weatherid < 600):
            return "🌧️";  // Rain
        case (weatherid >= 600 && weatherid < 700):
            return "❄️";  // Snow
        case (weatherid >= 700 && weatherid < 800):
            return "🌫️";  // Mist
        case (weatherid === 800):
            return "🌞";  // Clear sky
        case (weatherid >= 801 && weatherid < 810):
            return "🌤️";  // Few clouds
        default:
            return "🌍";  
    }
}

function displayerror(message){
    const errordisplay=document.createElement("p");
    errordisplay.textContent=message;
    errordisplay.classList.add("errordisplay");

    card.textContent="";
    card.style.display="flex";
    card.appendChild(errordisplay);
}
