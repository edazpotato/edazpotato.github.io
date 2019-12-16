//import Cookies from 'cookies'

var button = document.getElementById('button');
var clicksDiv = document.getElementById('clicks');
var clickAdd = 1;
var clicks = 0;

clicksCookie = cookies.getCookie('clicks');
if(clicksCookie != null || clicksCookie >= 1){
    clicks = cookies.getCookie('clicks');
}

button.addEventListener('click', click);

function click(){
    console.log('Clicked!');
    clicks = clicks + clickAdd;
    render();
    cookies.setCookie('clicks', clicks, 10);
};

//cean up bad stuff
function cleanUp(){
    if (clicks < 1){
        clicks = 0;
    };
};

//render stuff
function render(){
    cleanUp();
    clicksDiv.innerHTML = clicks;
};