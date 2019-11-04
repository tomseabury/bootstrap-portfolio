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
        
        console.log("Hello world");
        console.log(snapShot.val());
        createTable(snapShot);
        $("tr").on('click', function (){
            if(this.id != ""){
                var backgroundpic = $(this).attr('value');
                var geocoder = new google.maps.Geocoder
                var rowID = this.id.substr(this.id.length - 1);
                geocoder.geocode({
                    address: $(this).attr('about'),
                }, function(results,status){
                    if (status == google.maps.GeocoderStatus.OK) {
                        map.setCenter(results[0].geometry.location);
                        map.setZoom(10);
                        document.body.style.backgroundImage = "url("+backgroundpic+")"
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


    function writeLocationData(location, name, email, imageUrl) {
        firebase.database().ref('users/' + location).set({
          username: name,
          email: email,
          profile_picture : imageUrl
        });
      }

      writeLocationData

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
            $('#infrogTable tr:last').after('<tr id="rowNumber'+i+'" value="'+snapShot.val().image+'" about="'+snapShot.val().address+'"></tr>');
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
