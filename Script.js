const search = document.getElementById("input");
// search.addEventListener('keypress', Weather);
search.addEventListener('click' ,Weather);
function Weather(){
    fetchApi(search.value);
    search.value="";
}

async function fetchApi(argument){
    try{
        let api = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${argument}&appid=256156d28a4575e841a3cce2fdfc060b&units=metric`)

        if(!api.ok){
           throw new Error("Couldn't fetch the weather");
        }
        else{
            let data = await api.json();
            display(data);
        }
    }
    catch(err){
        console.log("Something went Wrong");
    }
}
function display(argu){



    let locate = document.querySelector(".location .City");
    locate.innerHTML=`<h3 style="margin:0.5em">${argu.name},${argu.sys.country}</h3>`;

    //let image = document.querySelector(".image1").src=argu.current.condition.icon;
    //image.innerHTML=`${argu.current.condition.icon}`

    let date = new  Date();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let din = document.querySelector(".location .time");
    din.innerHTML=`<h3 style="margin:0.4em">${days[date.getDay()]}-${date.getDate()}-${months[date.getMonth()]},${date.getFullYear()}</h3>`;

    let condition = document.querySelector(".current .temp");

    condition.innerHTML=`<h4 style="margin:0.4em">Condition: ${argu.weather[0].main}</h4>`;

    let temperature = document.querySelector(".current .weather");
    temperature.innerHTML=`<h4 style="margin:0.4em">Temperature: ${argu.main.temp}&deg</h4>`;

    let Humidity = document.querySelector(".current .Humid");
    Humidity.innerHTML=`<h4 style="margin:0.4em">Humidity: ${argu.main.humidity}</h4>`;

    let Feels = document.querySelector(".current .feelLike");
    Feels.innerHTML=`<h4 style="margin:0.4em">Feels Like: ${argu.main.feels_like}&deg</h4>`;
}
