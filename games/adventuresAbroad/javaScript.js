$(()=> {

    var config = {
        apiKey: "AIzaSyBvsyuXzArEHigJbCtTmTO4_v2cpRTWQRk",
        authDomain: "thomasfurtrader.firebaseapp.com",
        databaseURL: "https://thomasfurtrader.firebaseio.com",
        projectId: "thomasfurtrader",
        storageBucket: "thomasfurtrader.appspot.com",
        messagingSenderId: "528829859070"
      };
    firebase.initializeApp(config);

    
    
    var database = firebase.database();

    var i = 0;
    var map;

    database.ref("/locations").on("child_added", function(snapShot){
        
        console.log("Hellow world");
        console.log(snapShot.val());
        createTable(snapShot);
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
                        document.body.style.backgroundImage = "url("+infoArr[rowID].details.image+")"
                      } else {
                        alert('Geocode was not successful for the following reason: ' + status);
                      };
                });
            };
        });
    });

    var mainBackgroundImages=[
        "https://www.flyingandtravel.com/wp-content/uploads/2017/02/new-zealand-milford-sound-mitre-peak-jetty.jpg",
        "https://i.redditmedia.com/CrnL3LEufx0oRuuaJu3fAUaNSmx5rrG_TmroFUgqzfc.jpg?s=5b59c51626f609d194b7dde4fb1b8ca3",
        "https://i.redditmedia.com/qYfOm5pz0pIgTx61F6iVpxQqfkq9Y5AADuXrFV6BVBM.jpg?s=654157778a27ea3503d73dee3cc6be94",
        "https://i.redditmedia.com/0oaZn78nmvLfPfIUMYQMsafo3cGpdZh1Kia079-5JTg.jpg?s=5d821d5af839e1fc84ddda9de84b3e0b"];
    
    var homeBase = [
        {details:{
            address: "1541 E Eaglemann Ct. West Jordan, UT 84084",
            MPG: 30,
            tankSize: 17,
        }}
    ];

    var infoArr = [
        {details:{
            name: "Yellowstone",
            address: "Yellowstone National Park, WY 82190",
            travleInfo:{
                milesFromHome: 335,
                timeToDestination: "4 h 59 min",
            },
            image: "http://foundtheworld.com/wp-content/uploads/2015/12/Yellowstone-National-Park-11.jpg"}
        },
        {details:{
            name: "Strawberry Reservoir",
            address: "Forest Rd 629, Heber City, UT 84032",
            travleInfo:{
                milesFromHome: 82,
                timeToDestination: "1 h 39 min",
            },
            image: "https://media.deseretdigital.com/file/9a84db1767?crop=top:0|left:0|width:1260|height:670|gravity:Center&quality=55&interlace=none&resize=width:1260&order=resize,crop&c=14&a=e0f131f0"}
        },
        {details:{
            name: "Bear Lake",
            address: "Rendezvous Beach Rd, Laketown, UT 84038",
            travleInfo:{
                milesFromHome: 142,
                timeToDestination: "2 h 23 min",
            },
            image: "https://i2.wp.com/www.spendlifetraveling.com/wp-content/uploads/2016/10/big_bear_lake_travel_tips.jpg?fit=1600%2C850&ssl=1"}
        },
        {details:{
            name: "Zion National Park",
            address: "171-163 Zion – Mount Carmel Hwy, Springdale, UT 84767",
            travleInfo:{
                milesFromHome: 297,
                timeToDestination: "4 h 23 min",
            },
            image: "http://www.somethingsbrewing.com/wp-content/uploads/2011/09/Zion_HDR-3.jpg"}
        },
        {details:{
            name: "Arches",
            address: "Arches Scenic Dr, Moab, UT 84532",
            travleInfo:{
                milesFromHome: 218,
                timeToDestination: "3 h 27 min",
            },
            image: "http://hdqwalls.com/wallpapers/arches-national-park-gm.jpg"}
        },
        {details:{
            name: "Grand Canyon",
            address: "Unnamed Road, North Rim, AZ 86052",
            travleInfo:{
                milesFromHome: 512,
                timeToDestination: "8 h 10 min",
            },
            image: "https://media.deseretdigital.com/file/aa89988589?type=jpeg&quality=55&c=15&a=4379240d"}
        },
        {details:{
            name: "Lake Powell",
            address: "100 Wahweap Blvd, Page, AZ 86040",
            travleInfo:{
                milesFromHome: 412,
                timeToDestination: "9 h 31 min",
            },
            image: "http://www.travelswithtracy.net/wp-content/uploads/2014/05/Alstrom-Point-7.jpg"}
        },
        {details:{
            name: "Goblin Valley",
            address: "Goblin Valley Rd, Green River, UT 84525",
            travleInfo:{
                milesFromHome: 202,
                timeToDestination: "3 h 27 min",
            },
            image: "https://www.stgeorgeutah.com/wp-content/uploads/2018/04/Goblin-Valley-landscape.jpg"}
        },
        {details:{
            name: "Havasupai",
            address: "Havasupai, Supai, AZ 86435",
            travleInfo:{
                milesFromHome: 633,
                timeToDestination: "9 h 45 min",
            },
            image: "https://www.coloradoavidgolfer.com/wp-content/uploads/2017/03/Havasupai-Falls.jpg"}
        }
    ];


    function createTableNoDataBase(){
        var age;
        infoArr.forEach(element => {
            var gallons = Math.ceil(element.details.travleInfo.milesFromHome/homeBase[0].details.MPG);
            $('#infrogTable tr:last').after('<tr id="rowNumber'+i+'"></tr>');
            $('#rowNumber'+i).append(
                '<td>'+element.details.name+'</td>'
                +'<td><span class="fake-link">'+element.details.address+'</span></td>'
                +'<td>'+element.details.travleInfo.milesFromHome+' miles</td>'
                +'<td><a href="http://google.com/search?q=directions to '+element.details.name+ ' from here" target="googleDirections">'+element.details.travleInfo.timeToDestination+'</a></td>'
                +'<td>'+gallons+' gal.</td>');
            i++
        });
    };

    //this is working to create the table. Now need to map the snapShot to the other functions, and get the table click function working again.

    function createTable(snapShot){
            var gallons = Math.ceil(snapShot.val().milesFromHome/homeBase[0].details.MPG);
            $('#infrogTable tr:last').after('<tr id="rowNumber'+i+'" class="'+snapShot.val().image+'" title="'+snapShot.val().address+'"></tr>');
            $('#rowNumber'+i).append(
                '<td>'+snapShot.val().name+'</td>'
                +'<td><span class="fake-link">'+snapShot.val().address+'</span></td>'
                +'<td>'+snapShot.val().milesFromHome+' miles</td>'
                +'<td><a href="http://google.com/search?q=directions to '+snapShot.val().name+ ' from here" target="googleDirections">'+snapShot.val().timeToDestination+'</a></td>'
                +'<td>'+gallons+' gal.</td>');
            i++
    };

    function myMap() {
        var mapProp= {
            center: new google.maps.LatLng(41.7102,-111.8363),
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
                        document.body.style.backgroundImage = "url("+element.details.image+")";
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

    function setBackGround(){
        document.body.style.backgroundImage = "url("+mainBackgroundImages[Math.floor(Math.random()*mainBackgroundImages.length)]+")"
    };

    myMap();
    setBackGround();
    createTableNoDataBase();
    
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
                    document.body.style.backgroundImage = "url("+infoArr[rowID].details.image+")"
                  } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                  };
            });
        };
    });

    $("h1").on('click', function(){
        map.setCenter({
            lat: 41.7102,
            lng: -111.8363
        }),
        map.setZoom(5);
        document.body.style.backgroundImage = "url("+mainBackgroundImages[Math.floor(Math.random()*mainBackgroundImages.length)]+")"
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
