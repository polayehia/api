const placeInInput = document.getElementById("find");
const btn = document.getElementById("btn");
const today = document.getElementById("dateToday");
const todayNumber = document.getElementById("dateTodayNumber");
const city = document.getElementById("city");
const todaytimp = document.getElementById("timpToday");
const firstIcon = document.getElementById("firstCardImage");
const suncondtion = document.getElementById("sun");
const umberella = document.getElementById("umberella")
const wind = document.getElementById("wind")
const compass= document.getElementById("compass")

const tomorrowNumber = document.getElementById("tomorrow")
const tomorrowIcon=document.getElementById("tomorrowIcon")
const tomorrowtimpBig=document.getElementById("tomorrowtimpBig")
const tomorrowtimpSmall=document.getElementById("tomorrowtimpSmall")
const suntomorrow=document.getElementById("suntomorrow")

const AfterTomorrowNumber = document.getElementById("AfterTomorrow")
const AfterTomorrowIcon=document.getElementById("AfterTomorrowIcon")
const AfterTomorrowtimpBig=document.getElementById("AfterTomorrowtimpBig")
const AfterTomorrowtimpSmall=document.getElementById("AfterTomorrowtimpSmall")
const sunAfterTomorrow=document.getElementById("sunAfterTomorrow")


// if i want the search work with the btn
// btn.addEventListener("click", function () {
//   let value = placeInInput.value;

//   apiFetch(value);
// });


// realytime search
placeInInput.addEventListener("input", function () {
  let value = placeInInput.value;
  if (value.length >= 3) {
    apiFetch(value);
  }
});

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    apiFetch(`${lat},${lon}`);
  });
}
async function apiFetch(country) {
  let api = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=33089e47f758498fb4c165943241906&q=${country}&days=3&aqi=no&alerts=no`
  );
  let data = await api.json();
  console.log(data);
  showTime(data);
  tomorrow(data)
  AfterTomorrow(data)
}
apiFetch();

function showTime(dataBack) {
  const todayDate = dataBack.current.last_updated;
  let date = new Date(todayDate);
  const Week = date.toLocaleString(`en-us`, { weekday: `long` });
  const tody = date.getDate();
  const month = date.toLocaleDateString(`en-us`, { month: `long` });
  today.innerHTML = Week;
  todayNumber.innerHTML = `${tody},${month}`;
  city.innerHTML = dataBack.location.name;
  todaytimp.innerHTML = dataBack.current.temp_c+`oC`;
  firstIcon.setAttribute("src", dataBack.current.condition.icon);
  suncondtion.innerHTML = dataBack.current.condition.text;
  umberella.innerHTML= dataBack.current.wind_mph
  wind.innerHTML= dataBack.current.wind_kph
  compass.innerHTML= dataBack.current.wind_dir
}


function tomorrow(backTomorrow) {
    const repeat =backTomorrow.forecast.forecastday[1]
    const tomorrowDate = repeat.date
  let datetomorrow = new Date(tomorrowDate);
  const Weektomorrow = datetomorrow.toLocaleString(`en-us`, { weekday: `long` });
  console.log( Weektomorrow);
  tomorrowNumber.innerHTML= Weektomorrow
  tomorrowIcon.setAttribute('src',repeat.day.condition.icon)
  tomorrowtimpBig.innerHTML=repeat.day.maxtemp_c
  tomorrowtimpSmall.innerHTML=repeat.day.mintemp_c
  suntomorrow.innerHTML=repeat.day.condition.text
}

function AfterTomorrow(backAfterTomorrow) {
    const repeat =backAfterTomorrow.forecast.forecastday[2]
    const AfterTomorrowDate = repeat.date
  let dateAfterTomorrow = new Date(AfterTomorrowDate);
  const WeekAfterTomorrow = dateAfterTomorrow.toLocaleString(`en-us`, { weekday: `long` });
  console.log( WeekAfterTomorrow);
  AfterTomorrowNumber.innerHTML= WeekAfterTomorrow
  AfterTomorrowIcon.setAttribute('src',repeat.day.condition.icon)
  AfterTomorrowtimpBig.innerHTML=repeat.day.maxtemp_c
  AfterTomorrowtimpSmall.innerHTML=repeat.day.mintemp_c
  sunAfterTomorrow.innerHTML=repeat.day.condition.text
}

















