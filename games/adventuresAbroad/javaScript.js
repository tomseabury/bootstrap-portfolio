$(function() {
    var map;
    var apiKey = "AIzaSyBCi9PmtjcyYxcfwV5YXjYyeq56knIlsEE";

    var infoArr = [
        {details: 
            {name: "Yellowstone",
            address: "Yellowstone National Park, WY 82190",
            addressDetail:{
                street:"S Entrance Rd",
                cityState: "Yellowstone National Park, WY",
                postal: "82190"              
            }}
        },
        {details: 
            {name: "Strawberry Reservoir",
            address: "Forest Rd 629, Heber City, UT 84032",
            addressDetail:{
                street:"Forest Rd 629",
                cityState: "Heber City, UT",
                postal: "84032"              
            }}
        },
        {details: 
            {name: "Bear Lake",
            address: "Rendezvous Beach Rd, Laketown, UT 84038",
            addressDetail:{
                street:"Rendezvous Beach Rd",
                cityState: "Laketown, UT",
                postal: "84038"              
            }}
        },
        {details: 
            {name: "Zion National Park",
            address: "171-163 Zion – Mount Carmel Hwy, Springdale, UT 84767",
            addressDetail:{
                street:"171-163 Zion – Mount Carmel Hwy",
                cityState: "Springdale, UT",
                postal: "84767"              
            }}
        },
        {details: 
            {name: "Arches",
            address: "Arches Scenic Dr, Moab, UT 84532",
            addressDetail:{
                street:"Arches Scenic Dr",
                cityState: "Moab, UT",
                postal: "84532"              
            }}
        },
        {details: 
            {name: "Grand Canyon",
            address: "Unnamed Road, North Rim, AZ 86052",
            addressDetail:{
                street:"Bridle Path",
                cityState: "North Rim, AZ",
                postal: "86052"              
            }}
        },
        {details: 
            {name: "Lake Powell",
            address: "100 Wahweap Blvd, Page, AZ 86040",
            addressDetail:{
                street:"100 Wahweap Blvd",
                cityState: "Page, AZ",
                postal: "86040"              
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
            var miles = 0;
            $('#infrogTable tr:last').after('<tr id="rowNumber'+rowNumber+'"></tr>')
            $('#rowNumber'+rowNumber).append('<td>'+element.details.name+'</td><td><span class="fake-link">'+element.details.address+'</span></td><td>'+miles+'</td><td>'+travleTime+'</td>')
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
    
    $('.carousel').carousel();
    
    // this is having a CORS issue, will need to set up some sort of server side request
    // $.ajax({
    //     method: 'GET',
    //     url: "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=40.6655101,-73.89188969999998&destinations=39.7102,-111.8363&key=" + apiKey,
    //     dataType: 'json',
    // })
    // .done(function(result){
    //     console.log(result);
    // });
        
});