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
setInterval(timeDisplay,10);
// 5 is milisecond