// osmb 3d (wants to be loaded after body)
/*
  var map = new OSMBuildings({

    position: { latitude: 55.681194, longitude: 12.575768 },
    zoom: 17,
    minZoom: 13,
    maxZoom: 20,
    effects: ['shadows'],
    attribution: '© Data <a href="https://openstreetmap.org/copyright/">OpenStreetMap</a> © Map <a href="https://mapbox.com/">Mapbox</a> © 3D <a href="https://osmbuildings.org/copyright/">OSM Buildings</a>'
      
  }).appendTo(document.getElementById('map'));

  map.addMapTiles('https://{s}.tiles.mapbox.com/v3/osmbuildings.kbpalbpk/{z}/{x}/{y}.png');
  map.addGeoJSONTiles('https://{s}.data.osmbuildings.org/0.2/hxmrcuw3/tile/{z}/{x}/{y}.json');
*/
//--------------------------------------------------------

/*
mySwiperH1.on('slideChange', onTimeChange3d2);

function onTimeChange3d2() {
    //map.setDate("March 24, 2018 15:4:18 GMT+0100 (CET)"); just for testing
    
    var swiperActiveIndex = mySwiperH1.activeIndex;
    
    //suncalc
    var times = SunCalc.getTimes(new Date(), 55.681194, 12.575768); //should use auto locate, this will be a problem - or actually should it use the current view? if you pan to somewhere else
    var sunriseHour = times.sunrise.getHours();
    var sunsetHour = times.sunset.getHours();

    var sunriseDisplay = sunriseHour - 2;
    var sunsetDisplay = sunsetHour;
    var dayHours = sunsetDisplay - sunriseDisplay;

    var sliderHour = remap(swiperActiveIndex, 0, dayHours, sunriseDisplay, sunsetDisplay) + 1;
    
    //xHour = mySwiperH1.activeIndex; 
    xHour = pad(sliderHour); 
    //map.setDate(xMonth + " " + xDay + ", " + xYear + " " + xHour + ":" + xMinute + ":" + xSecond + " " + timeZoneFormatted);
    //console.log(xMonth + " " + xDay + ", " + xYear + " " + xHour + ":" + xMinute + ":" + xSecond + " " + timeZoneFormatted);
    
    //var padmin = pad(xMinute);
    
    //$("#timeDisplay").text( xHour + ":" + padmin);
    
}  */