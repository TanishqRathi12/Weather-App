const search = document.getElementById("input");
// search.addEventListener('keypress', Weather);
search.addEventListener('click' ,Weather);
function Weather(){
    fetchApi(search.value);
    search.value="";
}

async function fetchApi(argument){
    try{
        let api = await fetch(`http://api.weatherapi.com/v1/current.json?key= 636870abdea14896858101646243006&q=${argument}&aqi=no`)
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
    console.log(argu)
    let image = document.querySelector(".image1").src=argu.current.condition.icon;
    //image.innerHTML=`${argu.current.condition.icon}`

    let locate = document.querySelector(".location .City");
    locate.innerHTML=`<h3 style="margin:0.5em">${argu.location.name},${argu.location.country}</h3>`;

    let date = new  Date();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let din = document.querySelector(".location .time");
    din.innerHTML=`<h3 style="margin:0.4em">${days[date.getDay()]}-${date.getDate()}-${months[date.getMonth()]},${date.getFullYear()}</h3>`;

    let condition = document.querySelector(".current .temp");
    condition.innerHTML=`<h4 style="margin:0.4em">${argu.current.condition.text}</h4>`;

    let temperature = document.querySelector(".current .weather");
    temperature.innerHTML=`<h4 style="margin:0.4em">${argu.current.temp_c}&deg</h4>`;
}
