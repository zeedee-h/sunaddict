/*TODO: 

benches + trees (Sampo)

use global user latlng for cafe distance calculation

search / places api

slide to remapped progress not index on timedisplay click

write osmb to change shadow fadeout

proper loading order (probably also promises)

menu > mention all apis 
menu > favourites 

ES6

remove jquery?
progressive !!

work for all locations (promises) < then can upload to github site
timezones.... https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
https://momentjs.com/timezone/docs/ Basically this just became the last step

*/

//get window height
var boxwidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var boxheight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

//set variables
var slidesPerViewNumber = boxwidth / ( boxheight / 7.5 );
var slidesPerViewNumberRounded = Math.round( slidesPerViewNumber );

//change css
var selectorSquare = document.querySelector(".selectorSquare");
selectorSquare.style.width = (( boxheight / 7.5 ) + 4 ) + 'px'; //could do this on window resize https://codepen.io/jondlm/pen/doijJ // or just use mySwiperH1.height; or in css

//--------------------------------- hide divs and set 'now' text

let userLat = 55.681194;
let userLng = 12.575768;

let singaporeLat = 1.280978;
let singaporeLng = 103.850573;

var times = SunCalc.getTimes(new Date(), userLat, userLng); //cph: 55.681194, 12.575768 - Singapore 1.280978, 103.850573
var sunriseHour = times.sunrise.getHours();
var sunsetHour = times.sunset.getHours();

var swiperSlideMin = sunriseHour - 2;
var swiperSlideMax = sunsetHour;

var d = new Date();
var currentHour = d.getHours() - 1;

function pad(v) {
  return (v < 10 ? '0' : '') + v;
}

$("#timeDisplay").text( d.getHours() + ":" + pad(d.getMinutes()));

/*var originalSwiperWrapperHTML = $("div.swiper-container-h1").html(); //for resetting Instead of resetting the whole thing it should just show all divs

function resetSwiper() { 
 console.log("resetting");

    $("div.swiper-container-h1").html(originalSwiperWrapperHTML);

        var mySwiperH1 = new Swiper('.swiper-container-h1', {

            slidesPerView: slidesPerViewNumberRounded,
            initialSlide: initialSliderSlide, //should auto detect current time or use 12 if not shown
            centeredSlides: true,
            simulateTouch: true,
            slideToClickedSlide: false, //disabled because doesnt seem to work
            resistanceRatio: 0, //max resistance, no out of bounds bounce
            //keyboard control    
            keyboard: {
                enabled: true,
                onlyInViewport: false,
            },
            //momentum
            freeMode: true, //
            freeModeMomentum: false, //
        });

}*/

//hide swiper slides outside daylight hours
$("div.swiper-slide.h1s:lt(" + swiperSlideMin + ")" ).css("display", "none"); //vanilla https://www.w3schools.com/jsref/met_nodelist_item.asp
$("div.swiper-slide.h1s:gt(" + swiperSlideMax + ")" ).css("display", "none"); //or https://www.w3schools.com/jsref/met_document_queryselectorall.asp

var initialSliderSlide = Math.round( (sunsetHour / 2 ) - 2 ); //just find some slide index in the middle of the day

//add "now" if it is in daylight hours
if (currentHour > swiperSlideMin && currentHour < swiperSlideMax) {
    
    $("div.time:eq(" + currentHour + ")" ).text( "now" ); //try append with br
    initialSliderSlide = (currentHour - swiperSlideMin);
    
} else {
    console.log("now is not shown");
}

//$(`div.swiper-slide.h1s:eq( ${( sunriseHour - 1 )} )` ).html( $(`div.swiper-slide.h1s:eq( ${( sunriseHour - 1 )} )`).html() + "sunrise" );
//$(`div.swiper-slide.h1s:eq( ${( sunsetHour - 1 )} )` ).html( $(`div.swiper-slide.h1s:eq( ${( sunsetHour - 1 )} )`).html() + "sunset" );

$(`div.time:eq( ${( sunriseHour - 1 )} )` ).text( $(`div.time:eq( ${( sunriseHour - 1 )} )`).text() + " sunrise" );
$(`div.time:eq( ${( sunsetHour - 1 )} )` ).text( $(`div.time:eq( ${( sunsetHour - 1 )} )`).text() + " sunset" );

$(`div.time:eq( ${( sunriseHour - 1 )} )` ).css("margin-bottom", "5%");
$(`div.time:eq( ${( sunsetHour - 1 )} )` ).css("margin-bottom", "5%");

$("div.time:lt(" + currentHour + ")" ).css("margin-bottom", "40%");

//add id
//$("div.swiper-slide.h1s:eq(" + ( sunriseHour - 1 ) + ")" ).attr('id', 'sunriseID');
//$("div.swiper-slide.h1s:eq(" + ( sunsetHour - 1 )+ ")" ).attr('id', 'sunsetID');

//insert image
//$( "#sunriseID" ).html( "<svg class='swiperSunSvg' id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><style>.cls-1,.cls-2{fill:none;stroke:#fff;stroke-linecap:round;stroke-width:4.61px;}.cls-1{stroke-miterlimit:10;}.cls-2{stroke-linejoin:round;}</style></defs><title>sunrise</title><path class='cls-1' d='M26.62,65.5a23.38,23.38,0,1,1,46.76,0'/><line class='cls-1' x1='16.26' y1='74.96' x2='83.74' y2='74.96'/><line class='cls-1' x1='50' y1='66.05' x2='50' y2='22.96'/><line class='cls-1' x1='29.68' y1='39.22' x2='24.18' y2='31.76'/><line class='cls-1' x1='18.29' y1='53.86' x2='10.15' y2='51.27'/><line class='cls-1' x1='70.31' y1='39.22' x2='75.81' y2='31.76'/><line class='cls-1' x1='81.7' y1='53.86' x2='89.84' y2='51.27'/><polyline class='cls-2' points='56.88 27.4 50 20.52 43.12 27.4'/></svg>" );
//$( "#sunsetID" ).html( "<svg class='swiperSunSvg' id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><style>.cls-1,.cls-2{fill:none;stroke:#fff;stroke-linecap:round;stroke-width:4.61px;}.cls-1{stroke-miterlimit:10;}.cls-2{stroke-linejoin:round;}</style></defs><title>sunset</title><path class='cls-1' d='M26.62,65.5a23.38,23.38,0,1,1,46.76,0'/><line class='cls-1' x1='16.26' y1='74.96' x2='83.74' y2='74.96'/><line class='cls-1' x1='50' y1='20.52' x2='50' y2='63.61'/><line class='cls-1' x1='29.68' y1='39.22' x2='24.18' y2='31.76'/><line class='cls-1' x1='18.29' y1='53.86' x2='10.15' y2='51.27'/><line class='cls-1' x1='70.31' y1='39.22' x2='75.81' y2='31.76'/><line class='cls-1' x1='81.7' y1='53.86' x2='89.84' y2='51.27'/><polyline class='cls-2' points='43.12 59.17 50 66.05 56.88 59.17'/></svg>" );

//------------------------- weather ------------------------------------------------------------------------------------------------

$(document).ready(function() {
    
    //var weatherCoords = map.getPosition();
    var weatherLat = userLat; //weatherCoords[0];
    var weatherLng = userLng; //weatherCoords[1];
    
    var URL = `https://api.weatherbit.io/v2.0/forecast/hourly?&lat=${weatherLat}&lon=${weatherLng}&key=092e73bdf99a4fb5abad6ac2000d8527`;
    
    function weather() {
        $.getJSON(URL, function(data) {
            
            //console.log(data);
            addWeather(data);
            
        });
    }
    
    weather();
    
    function addWeather(data) {
        
        //console.log(data.data[1].clouds);
        
        function addWeatherToSwiper(cloudName) {
            $(`div.swiper-slide.h1s:eq( ${i} )`).html( $(`div.swiper-slide.h1s:eq( ${i} )`).html() + "<br> " + cloudName); 
        }
        
        var divArray = $( "div.swiper-slide.h1s" ).toArray();
        
        for (i = currentHour; i < (swiperSlideMax + 1); i++) { 
            
            //$(`div.swiper-slide.h1s:eq( ${i} )`).html( $(`div.swiper-slide.h1s:eq( ${i} )`).html() + "<br>" + data.data[i - currentHour].clouds + "%");
            
            $(`div.swiper-slide.h1s:eq( ${i} )`).html( $(`div.swiper-slide.h1s:eq( ${i} )`).html() + `<br>
            <img class="weatherIcon shadow2" src="https://www.weatherbit.io/static/img/icons/${data.data[i - currentHour].weather.icon}.png"></img>`);
            
            //var iconURL = `url("https://www.weatherbit.io/static/img/icons/${data.data[i - currentHour].weather.icon}.png")`
            //$(`div.swiper-slide.h1s:eq( ${i} )`).css('background-image', iconURL);
            
            //these need to be moved to a promise or made separately
            //const sunriseIcon = `url("https://www.dropbox.com/s/vwjoq0qzten6s25/sunrise.png?raw=1")`
            //const sunsetIcon = `url("https://www.dropbox.com/s/bbirvi0am13okd2/sunset.png?raw=1")`

            //$(`div.swiper-slide.h1s:eq( ${( sunriseHour - 1 )} )` ).css('background-image', sunriseIcon);
            //$(`div.swiper-slide.h1s:eq( ${( sunsetHour - 1 )} )` ).css('background-image', sunsetIcon);
            
            /*if (data.data[i - currentHour].clouds < 20) {
                addWeatherToSwiper("clear"); //$(`div.swiper-slide.h1s:eq( ${i} )`).html( $(`div.swiper-slide.h1s:eq( ${i} )`).html() + "<br> clear" ); //divArray[i].append("clear"); or .appendChild()
            } else if (data.data[i - currentHour].clouds > 20 && data.data[i - currentHour].clouds < 80) {
                addWeatherToSwiper("cloudy");
            } else if (data.data[i - currentHour].clouds > 80) {
                addWeatherToSwiper("overcast");
            }*/
        }
        
    };
    
});


//------------------------- <!-- Initialize Swipers --> --------------------------------------------------------------------------------

var swiperV = new Swiper('.swiper-container-v', {
      direction: 'vertical',
      grabCursor: true,
      resistanceRatio: 0, //max resistance, no out of bounds bounce
    });

var mySwiperH1 = new Swiper('.swiper-container-h1', {

        slidesPerView: slidesPerViewNumberRounded,
        initialSlide: initialSliderSlide,
        centeredSlides: true,
        simulateTouch: true,
        slideToClickedSlide: false, //disabled because doesnt seem to work
        resistanceRatio: 0, //max resistance, no out of bounds bounce
        //keyboard control    
        keyboard: {
            enabled: true,
            onlyInViewport: false,
        },
        //momentum
        freeMode: true, //
        freeModeMomentum: false, //
});

var swiperH2 = new Swiper('.swiper-container-h2', {
        resistanceRatio: 0.75,
    });

//------------------------------------------------------------------------------------------------------------------------------

swiperV.on('slideNextTransitionStart', function () {
    console.log("menu pulled up");
    
    let mapDiv = document.querySelector("#map");
    let spacerDiv = document.querySelector("#menuSpacer");
    
    mapDiv.style.height = 70 + "%";
    spacerDiv.style.height = 15 + "%";
    
});

swiperV.on('slidePrevTransitionStart', function () {
    console.log("menu pulled down");
    
    let mapDiv = document.querySelector("#map");
    let spacerDiv = document.querySelector("#menuSpacer");
    
    mapDiv.style.height = 85 + "%";
    spacerDiv.style.height = 0 + "%";
    
});

/*swiperH2.on('slideChangeTransitionEnd', function () {
    console.log("h2 change");

    var testLocations = [
        { cafeName: "Cafe Name 1", latlng: { latitude:55.681194, longitude:12.575768 }},
        { cafeName: "Cafe Name 2", latlng: { latitude:55.682585, longitude:12.557673 }},
        { cafeName: "Cafe Name 3", latlng: { latitude:55.693048, longitude:12.563256 }},
    ];
    
    map.setPosition(testLocations[swiperH2.activeIndex].latlng);
    
    $( ".swiper-container-h2" ).find
    ( "div.swiper-slide.h2s" ).eq
    ( swiperH2.activeIndex ).html
    ( testLocations[swiperH2.activeIndex].cafeName );
        
});*/

//------------------------------------------------------------------------------------------------------------------------------

const testLocations = [
        { cafeName: "Cafe Name 1", latlng: { latitude:55.681194, longitude:12.575768 }},
        { cafeName: "Cafe Name 2", latlng: { latitude:55.682585, longitude:12.557673 }},
        { cafeName: "Cafe Name 3", latlng: { latitude:55.693048, longitude:12.563256 }},
        { cafeName: "Cafe Name 4", latlng: { latitude:55.681194, longitude:12.575768 }},
        { cafeName: "Cafe Name 5", latlng: { latitude:55.682585, longitude:12.557673 }},
        { cafeName: "Cafe Name 6", latlng: { latitude:55.693048, longitude:12.563256 }},
        { cafeName: "Cafe Name 7", latlng: { latitude:55.681194, longitude:12.575768 }},
        { cafeName: "Cafe Name 8", latlng: { latitude:55.682585, longitude:12.557673 }},
        { cafeName: "Cafe Name 9", latlng: { latitude:55.693048, longitude:12.563256 }},
];

/*for (i = 0; i < testLocations.length; i++) {
    
    let favList = document.getElementById("favourites");
    
    var para = document.createElement("P");                                 // Create a <p> element
    var t = document.createTextNode(`${testLocations[i].cafeName}`);      // Create a text node
    para.appendChild(t);                                                     // Append the text to <p>
    document.getElementById("favourites").appendChild(para); 
    
}*/

/*for (i = 0; i < testLocations.length; i++) {
  var temp = document.createElement('div');
  //temp.className = 'results';
  temp.innerHTML = testLocations[i].cafeName;
  document.getElementById("favourites").appendChild(temp);
  temp.addEventListener('click', locateCafe(i));
    

}

    function locateCafe(input) {
        map.setPosition(testLocations[i].latlng);
    }*/

//------------------------------------------------------------------------------------------------------------------------------

//remap normal index to 24 hour time
function remap (swiperActiveIndex, in_min, in_max, out_min, out_max) {
    return (swiperActiveIndex - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};

function convertMinsToHrsMins(mins) {
  let h = Math.floor(mins / 60);
  let m = mins % 60;
  h = h < 10 ? '0' + h : h;
  m = m < 10 ? '0' + m : m;
  return `${h}:${m}`;
}

mySwiperH1.on('sliderMove', function () {
    
    now = new Date;
    
    //get timezone
    var split = new Date().toString().split(" ");
    var timeZoneFormatted = split[split.length - 2] + " " + split[split.length - 1]; 

    var monthStrings = new Array(); //could try the new method ECMAScript https://stackoverflow.com/questions/1643320/get-month-name-from-date
    monthStrings[0] = "January";
    monthStrings[1] = "February";
    monthStrings[2] = "March";
    monthStrings[3] = "April";
    monthStrings[4] = "May";
    monthStrings[5] = "June";
    monthStrings[6] = "July";
    monthStrings[7] = "August";
    monthStrings[8] = "September";
    monthStrings[9] = "October";
    monthStrings[10] = "November";
    monthStrings[11] = "December";

    var xYear = now.getFullYear();
    var xMonth = monthStrings[now.getMonth()]; 
    var xDay = now.getDate();
    var xHour = now.getHours();
    var xMinute = now.getMinutes();
    var xSecond = now.getSeconds();
    
    //-----------------------------
    
    var sliderProgress = mySwiperH1.progress;
     
    var sunriseMinutes = (times.sunrise.getHours() -1 ) * 60;
    var sunsetMinutes = (times.sunset.getHours() +1 ) * 60;
    
    var sliderMinute = remap(sliderProgress, 0, 1, sunriseMinutes, sunsetMinutes); //value, in min, in max, out min, out max
    
    sliderMinuteRounded = Math.round(sliderMinute);
    
    var sliderMinuteConverted = convertMinsToHrsMins(sliderMinuteRounded);
    
    console.log( sliderMinuteConverted ); //console.log(mySwiperH1.progress);
    
    $("#timeDisplay").text( sliderMinuteConverted );
    map.setDate(xMonth + " " + xDay + ", " + xYear + " " + sliderMinuteConverted + ":" + xSecond + " " + timeZoneFormatted); //map.setDate( `${xMonth} ${xDay}, 
    
}); 

//----------------------------------------------------------------------------------------------------------------------------------------

document.getElementById("timeDisplay").addEventListener("click", swipeToNow);
function swipeToNow() {
    console.log("timeDisplay Clicked");
    
    if (currentHour > swiperSlideMin && currentHour < swiperSlideMax) {

        mySwiperH1.slideTo( (currentHour - swiperSlideMin) );
    }
    
    map.setDate(d);
    $("#timeDisplay").text( d.getHours() + ":" + pad(d.getMinutes())); //$("#timeDisplay").text( `${d.getHours()}:${d.getMinutes()}` ); //pad these like $("#timeDisplay").text( d.getHours() + ":" + pad(d.getMinutes()));
    
}

document.getElementById("searchBtn").addEventListener("click", searchOpen);
function searchOpen() {
    console.log("Search Btn Clicked");
}

document.getElementById("menuBtn").addEventListener("click", menuOpen);
function menuOpen() {
    console.log("Menu Btn Clicked");
    document.getElementById("mySidenav").style.width = "70vw";
    document.getElementById("mySidenav").style.boxShadow = "0 0 0 1800px rgba(0, 0, 0, 0.3)";
}

document.getElementById("menuCloseBtn").addEventListener("click", menuClose);
function menuClose() {
    console.log("Menu Close Btn Clicked");
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("mySidenav").style.boxShadow = "0 0 0 1800px rgba(0, 0, 0, 0)";
}

document.getElementById("locateBtn").addEventListener("click", getLocation);

var userGlobalLat;
var userGlobalLng;

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(pos) {
        
      console.log("Latitude: " + pos.coords.latitude + "Longitude: " + pos.coords.longitude);
        
      map.setPosition({latitude:pos.coords.latitude, longitude:pos.coords.longitude});
        
        var userLabel = document.getElementById('userLabel');
        
        var userIconPos = map.project(pos.coords.latitude, pos.coords.longitude, 0); //should do these 3 once the map is loaded
        userLabel.style.left = Math.round(userIconPos.x) + 'px';
        userLabel.style.top = Math.round(userIconPos.y) + 'px';
        document.querySelector("#userLabel").style.display = "block";
        
        userGlobalLat = pos.coords.latitude;
        userGlobalLng = pos.coords.longitude;

      //mySwiperH1.destroy(true, false);    
      //resetSwiper();
        
    });
      
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

//------------------------------------------------------------------------------------------------------------------------------------

var map = new OSMBuildings({

    position: { latitude: userLat, longitude: userLng },
    zoom: 17,
    minZoom: 13,
    maxZoom: 20,
    effects: ['shadows'],
    attribution: '© Data <a href="https://openstreetmap.org/copyright/">OpenStreetMap</a> © Map <a href="https://mapbox.com/">Mapbox</a> © 3D <a href="https://osmbuildings.org/copyright/">OSM Buildings</a>'

}).appendTo(document.getElementById('map'));

map.addMapTiles('https://{s}.tiles.mapbox.com/v3/osmbuildings.kbpalbpk/{z}/{x}/{y}.png');
map.addGeoJSONTiles('https://{s}.data.osmbuildings.org/0.2/hxmrcuw3/tile/{z}/{x}/{y}.json');

//---------------------------------------------- markers --------------------------------------------------------------------------------------

//var obj = map.addOBJ('models/Tree%20Low.obj', {longitude:userLng,latitude: userLat },{id: "marker" ,scale : 1, elevation :0, rotation : 0 , color: 'red'});

const benchTestArray = [
    {lat: userLat, lng: userLng},
    {lat: 55.681126, lng: 12.576072},
    {lat: 55.681866, lng: 12.575949},
];

/*var benchLabel = document.querySelector(".benchLabel");

var benchIconPos = map.project(benchTestArray[0].lat, benchTestArray[0].lng, 0); //should do these 3 once the map is loaded
benchLabel.style.left = Math.round(benchIconPos.x) + 'px';
benchLabel.style.top = Math.round(benchIconPos.y) + 'px'; */


for (i = 0; i < benchTestArray.length; i++) {
    
    var tempBenchLabel = document.createElement('div');
    tempBenchLabel.className = `benchLabel ${i}`;
    tempBenchLabel.innerHTML = `<img class="benchIcon" src="https://www.dropbox.com/s/rhha2bj6ujz2xpc/bench128.png?raw=1">`;
    
    var benchIconPos = map.project(benchTestArray[i].lat, benchTestArray[i].lng, 0);
    tempBenchLabel.style.left = Math.round(benchIconPos.x) + 'px';
    tempBenchLabel.style.top = Math.round(benchIconPos.y) + 'px'; 
    
    document.getElementById('labels').appendChild(tempBenchLabel);
};

map.on('change', function() {
   //var benchIconPos = map.project(benchTestArray[0].lat, benchTestArray[0].lng, 0);
   //benchLabel.style.left = Math.round(benchIconPos.x) + 'px';
   //benchLabel.style.top = Math.round(benchIconPos.y) + 'px';
    
   //document.querySelector(".benchLabel").style.width = remap(map.getZoom(), 14.5, 20, 8, 32) + "px"; //value, in min, in max, out min, out max
   //document.querySelector(".benchIcon").style.width = "inherit"; 
    
    for (i = 0; i < benchTestArray.length; i++) {
        var benchLabel = $(`div.benchLabel:eq( ${i} )` );
        
        var benchIconPos = map.project(benchTestArray[i].lat, benchTestArray[i].lng, 0);
        
        benchLabel.css('left', Math.round(benchIconPos.x) + 'px');
        benchLabel.css('top', Math.round(benchIconPos.y) + 'px');

    };

    //then update user icon location
    var userLabel = document.querySelector("#userLabel");
    var userLabelPos = map.project(userGlobalLat, userGlobalLng, 0);
    
    userLabel.style.left = Math.round(userLabelPos.x) + 'px';
    userLabel.style.top = Math.round(userLabelPos.y) + 'px'; 
    
});
