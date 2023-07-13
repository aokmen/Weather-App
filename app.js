//DOM
const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner form input");
const msgSpan = document.querySelector(".top-banner .msg");
const list = document.querySelector(".cities");




//variable
let units = "metric"; //imperial (f), bos birakirsak default kelvin degeri
let lang = "en"; // Almanca icin "de" kullanilacak
let url; // konum veya search butonu url si olarak kullanilacak. Buyzden burasi bos >> global.
let cities = [];
const apiKey = "41439341552d09ccd6617f759d78c59c";

// localStorage.setItem("apiKey",'41439341552d09ccd6617f759d78c59c') //Sifresiz localstorage gönderir
// localStorage.setItem("apiKey",EncryptStringAES('41439341552d09ccd6617f759d78c59c'))
// const apiKey =DecryptStringAES(localStorage.getItem("apiKey")) 
//language

const clearAllButton = document.getElementById("clear-all");
const langButton = document.getElementById("lang");
const searchEl = document.getElementById("search");

//location
const locate = document.getElementById("locate")

locate.addEventListener("click",() => {
    navigator.geolocation?.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}&lang=${lang}`
    getWeatherDataFromApi();
    
    })
})

//form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    const cityName = input.value;
    url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}&lang=${lang}`;

    getWeatherDataFromApi();
  }

  form.reset(); //Form icerisindeki tüm inputlari sifirlar
});

//language button
langButton.addEventListener("click", (e)=>{
    if(e.target.id == "de"){
        lang = "de"
        input.setAttribute("placeholder", "🔍Suche nach einer Stadt" );
        searchEl.innerHTML = "SUCHE";
        clearAllButton.innerHTML = "Alles Löschen";

    }else if (e.target.id == 'en'){
        lang = "en";
        input.setAttribute("placeholder", `🔍Search for a city`);
        searchEl.innerHTML = "SEARCH";
        clearAllButton.innerHTML = "Clear All"; 
    }else if (e.target.id == "clear-all"){
        cities = [];
        list.innerHTML = ""
    }


});

const getWeatherDataFromApi = async () => {
  try {
    const response = await axios(url); // axios ile istek atma >> 3. bir kütüphaneden aliniyor
    // const response = await fetch(url).then((response) => response.json()); // fetch ile istek atma

    // const { main, name, weather, sys } = response; //data destruction
    const { main, name, weather, sys } = response.data; //axios destruction >> axios 
    console.log(weather[0]);
    // const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    const iconUrl = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0].icon}.svg`

    if(cities.indexOf(name) == -1) {

        cities.unshift(name) // ayni sehir isimi degilse bos listeye bastan ekle

    const resultData = document.createElement("li");
    resultData.classList.add("city");
    resultData.setAttribute("id", `${name}`);

    resultData.innerHTML = 
    `<h2 class="city-name" >
        <div>
          <span>${name}</span>
          <sup>${sys.country}</sup> 
        </div>  
          <button type='button' class='single-clear-btn'>X</button>
      </h2>
      <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
      <figure>
           <img class="city-icon" src="${iconUrl}">
          <figcaption>${weather[0].description}</figcaption>
      </figure>`;

    list.prepend(resultData);
        const singleClearButton = document.querySelectorAll(".single-clear-btn")
        singleClearButton.forEach((button) => {
            button.addEventListener("click",(e)=>{
                delete cities[cities.indexOf(e.target.closest(".city").id)]
                // cities.splice(cities.indexOf(e.target.closest(".city").id),0)
                e.target.closest(".city").remove()
            })
        })
        



    }else {
        if (lang == "de") {
            msgSpan.innerText = `Sie kennen das Wetter für die ${name} bereits. Bitte suchen Sie nach einer anderen Stadt 😉`;
          } else {
            msgSpan.innerText = `You already know the weather for ${name}, Please search for another city 😉`;
          }
        setInterval(()=>{
            msgSpan.innerText =""
        },4000)
    }

  } catch (error) {

    if (lang == "de") {
        msgSpan.innerText = `Stadt nicht gefunden`;
      } else {
        msgSpan.innerText = "City not found!";
      }
    setInterval(()=>{
        msgSpan.innerText =""
    },4000)
  }
};
