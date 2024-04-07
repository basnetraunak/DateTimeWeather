function timeDisplay(){
    let dateTime = new Date();
    let  hrs = dateTime.getHours();
    let  min = dateTime.getMinutes();
    let sec = dateTime.getSeconds();
    let session = document.getElementById('session');
    if (hrs <= 12){
        session.innerHTML = 'AM';
        
    } else{
        session.innerHTML = 'PM';
        hrs = hrs-12;
    }
    //first hrs below is from one declared above and after = is the id for hour in html
    document.getElementById('hrs').innerHTML = hrs;
    document.getElementById('min').innerHTML = min;
    document.getElementById('sec').innerHTML = sec;
}
setInterval(timeDisplay,100);
// 10 is msilisecond above
//Now getting weather data both current and hourly
function getWeather(){
    const apiKey = '155e414595e0645aacb666b0bbf2397b';// api key from weather map
    const city = document.getElementById('city').value; // geting the user input for city
   //checking if user has enter value in city or not and alert if not
   if(!city){
        alert("You have not entered city name.");
        return;
    }
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}` // This is url for current weather based on the city user entered and your api key can get her in openweather map https://openweathermap.org/current
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;  // This is url for forecast weather based on the city user entered and your api key can get her in openweather map https://openweathermap.org/forecast5

    //fetch current weather data
    fetch(currentWeatherUrl)
        .then(response=> response.json())//parse response as json
        .then(data => {displayWeather(data)})//passing this data to displayWeather function 
        //if error log in console and alert to user
        .catch(error => 
        {
            console.error('Error fetching current data:', error);
            alert(`Opps there seems to be error fetching current weather data. Please try again.`);
        });
    //fetch forecast weather data
    fetch(forecastUrl)
        .then(response=> response.json())//parse response as json
        .then(data => {displayHourlyForecast(data.list)})//passing this data which is in list to displayHourlyForecast function , here we have list as we have api having list as a key  "list": [{"dt": 1709467200,"main": { in json
        //if error log in console and alert to user
        .catch(error => 
        {
            console.error('Error fetching forecast data:', error);
            alert(`Opps there seems to be error fetching hourly forecast weather data. Please try again.`);
        });
        
       
}setInterval(getWeather,1000000);
//function for dasplying weather
function displayWeather(data){
    
    const weatherInfoDiv   =   document.getElementById('weather-info'); // refrence to weather div in index.html where weather info is displayed
   
    const hourlyForecastDiv   =   document.getElementById('hourly-forecast'); // refrence to hourly forecast div in index.html where hourly forecast is displayed

     // clearing previous content using the variables decleared above
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = ' ';


//check for recived data has an error code the cod is how code is coming from the api call
    if(data.cod === '404'){

        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    }
    else {
        //here we are using data coming on displayWeather function which is currentWeatherUrl content if you wish to see whats coming use the url replace cityname and appid value

        const cityName = data.name; //this is city name and can be seen in url
        const temperature = Math.round(data.main.temp - 273.15); //temperature converted to celcius
        const feelsLikeTemp = Math.round(data.main.feels_like -273.15) //feels like temperature converted to celcius
        const description = data.weather[0].description; //this is description of weather where in one sample i have "weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02n"}],
        const iconCode = data.weather[0].icon;// this is icon code to display as we get data see sample in comment of description variable
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`; // now we are getting icon for this icon code

        //html content for cityname temperature, city name, description, feels like temp

        //const temperatureHTML = `<p>${temperature} C</p>`;
        const weatherHTML = `<div class="card card text-bg-dark mb-3" style="width: 18rem;">
                                <div class="card-header">Current Weather</div>
                                <div class="card-body">
                                <img src="${iconUrl}" class="card-img-top" alt="${description}">
                                    <p class="card-text">${temperature} C</p>
                                    <p>${cityName}</p>
                                    <p>${description}</p>
                                    <p>Feels like: ${feelsLikeTemp} C</p>
                                </div>
                            </div>
                            `;
    //now assign these values in variables which refrence to index.html content which is declared in top of this function to display
        //tempDivInfo.innerHTML = temperatureHTML; 
        weatherInfoDiv.innerHTML = weatherHTML;
        //weatherIcon.src = iconUrl; //providing the link to display the icon from weather-icon id containing tag is img so src is a attribute of this tag
        //weatherIcon.alt = description; //giving the description coming from api to description variable and assigning it to the img tag where the weathericon variable has a id of weather-icon and alt is attribute of img tag
            

    }

}
//function for displaying hourly forcast
function displayHourlyForecast(DataHourly){
    const hourlyForecastDiv = document.getElementById('hourly-forecast');//html div tag reference to div tag having id hourly-forecast in index.html
    const next24Hours = DataHourly.slice(0,8); //(output of slice is another array)here we are taking elements from the 'list' keyword which is coming from api and is array and we are getting from index 0-8 since this is slice function we get 0-7 index data and we will have 8 data where each have info of 3 hrs where 8*3= 24, see https://api.openweathermap.org/data/2.5/forecast?q=sydney&appid=155e414595e0645aacb666b0bbf2397b where we have "list" array
//now we are iterating via all the elements in next24Hours array
    next24Hours.forEach(item =>
        {
            const dateandTime = new Date(item.dt * 1000); //dt is coming from json data for each item, where Data receiving time (in unix, UTC format). dt is the time of data receiving in unixtime GMT (greenwich mean time) we are muntiplying by 1000 to convert to milisecond as 1s=1000 ms, and then passing it to Date object, ok so 0 is a date around 1969 dec 31 which is wen computer thinks time begain now the amount of milisecond you pass defines the time since then. 
            const itemhour = dateandTime.getHours(); //getting the hour of time from above passed ms
            const temperature = Math.round(item.main.temp - 273.15); //celcius temperature of this particular item in next24 hrs array

            const feels = Math.round(item.main.feels_like - 273.15); 

            const description = item.weather[0].description;

            const iconCode = item.weather[0].icon;// this is icon code to display , in json we have weather array which have only one content and the icon key in weather array has icon for this particular item
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`; // now we are getting icon for this icon code @2x is removed then before because this is to be displayed in small ratio
    
            const hourlyItemHtml = `
                                    <div class="card card text-bg-dark mb-3" style="width: 18rem;">
                                            <div class="card-header">${itemhour}:00</div>
                                            <div class="card-body">
                                                <img src="${iconUrl}" class="card-img-top" alt="${description}">
                                                <p class="card-text">${temperature} C</p>
                                                <p>Feels Like: ${feels} C</p>
                                            </div>
                                    </div>
                                        
            `;
            hourlyForecastDiv.innerHTML += hourlyItemHtml;// append created hourly forecast item 



        });

}
//creating a showImage() function which is called in displayWeather(), 

