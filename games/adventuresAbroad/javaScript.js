$(document).ready(function() {
    var map;
    var apiKey = "AIzaSyBCi9PmtjcyYxcfwV5YXjYyeq56knIlsEE";

    var homeBase = [
        {details:{
            address: "9706 S 1210 E Sandy, UT 84094",
            MPG: 15,
            tankSize: 25,
        }}
    ]
    var infoArr = [
        {details:{
            name: "Yellowstone",
            address: "Yellowstone National Park, WY 82190",
            travleInfo:{
                milesFromHome: 335,
                timeToDestination: "4 h 59 min",
            }}
        },
        {details:{
            name: "Strawberry Reservoir",
            address: "Forest Rd 629, Heber City, UT 84032",
            travleInfo:{
                milesFromHome: 82,
                timeToDestination: "1 h 39 min",
            }}
        },
        {details:{
            name: "Bear Lake",
            address: "Rendezvous Beach Rd, Laketown, UT 84038",
            travleInfo:{
                milesFromHome: 142,
                timeToDestination: "2 h 23 min",
            }}
        },
        {details:{
            name: "Zion National Park",
            address: "171-163 Zion – Mount Carmel Hwy, Springdale, UT 84767",
            travleInfo:{
                milesFromHome: 297,
                timeToDestination: "4 h 23 min",
            }}
        },
        {details:{
            name: "Arches",
            address: "Arches Scenic Dr, Moab, UT 84532",
            travleInfo:{
                milesFromHome: 218,
                timeToDestination: "3 h 27 min",
            }}
        },
        {details:{
            name: "Grand Canyon",
            address: "Unnamed Road, North Rim, AZ 86052",
            travleInfo:{
                milesFromHome: 512,
                timeToDestination: "8 h 10 min",
            }}
        },
        {details:{
            name: "Lake Powell",
            address: "100 Wahweap Blvd, Page, AZ 86040",
            travleInfo:{
                milesFromHome: 412,
                timeToDestination: "9 h 31 min",
            }}
        }
    ];


    function createTable(){
        var i = 0;
        var age;
        var rowNumber;
        infoArr.forEach(element => {
            rowNumber = i;
            var travleTime = 0;
            var gallons = Math.ceil(element.details.travleInfo.milesFromHome/homeBase[0].details.MPG);
            $('#infrogTable tr:last').after('<tr id="rowNumber'+rowNumber+'"></tr>');
            $('#rowNumber'+rowNumber).append(
                '<td>'+element.details.name+'</td>'
                +'<td><span class="fake-link">'+element.details.address+'</span></td>'
                +'<td>'+element.details.travleInfo.milesFromHome+'</td>'
                +'<td>'+element.details.travleInfo.timeToDestination+'</td>'
                +'<td>'+gallons+' gal.</td>');
            i++
        });
    };

    function myMap() {
        var mapProp= {
            center: new google.maps.LatLng(39.7102,-111.8363),
            zoom:5,
            mapTypeId: google.maps.MapTypeId.HYBRID,
            mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
        };
        map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
        setPins(map);
    };

    function setPins(map) {
        var newPin = new google.maps.Geocoder
        infoArr.forEach(element => {
            newPin.geocode({
                address: element.details.address,
            }, function(results,status){
                if (status == google.maps.GeocoderStatus.OK) {
                    var marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location,
                        animation: google.maps.Animation.DROP,
                    });
                    var infoMarker = new google.maps.InfoWindow({
                        content: element.details.name,
                    });
                    google.maps.event.addListener(marker,'click',function() {
                        map.setZoom(12);
                        map.setCenter(marker.getPosition());
                      });
                    google.maps.event.addListener(marker,'mouseover',function(){
                        infoMarker.open(map, marker);
                    });
                    google.maps.event.addListener(marker,'mouseout',function(){
                        infoMarker.close();
                    });
                  } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                };
            });
        });
    };

    createTable();
    myMap();
    
    $("tr").on('click', function (){
        if(this.id != ""){
            var geocoder = new google.maps.Geocoder
            var rowID = this.id.substr(this.id.length - 1);
            geocoder.geocode({
                address: infoArr[rowID].details.address,
            }, function(results,status){
                if (status == google.maps.GeocoderStatus.OK) {
                    map.setCenter(results[0].geometry.location);
                    map.setZoom(10);
                  } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                  };
            });
        };
    });

    $("h1").on('click', function(){
        map.setCenter({
            lat: 39.7102,
            lng: -111.8363
        }),
        map.setZoom(5);
    });

 
    // this is having a CORS issue, will need to set up some sort of server side request if I want to proceed
    // $.ajax({
    //     method: 'GET',
    //     url: "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=40.6655101,-73.89188969999998&destinations=39.7102,-111.8363&key=" + apiKey,
    //     dataType: 'json',
    // })
    // .done(function(result){
    //     console.log(result);
    // });

});
