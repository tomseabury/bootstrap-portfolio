
var config = {
  apiKey: "AIzaSyAbaSKs8E1K0w4-XXFrjRByV0s2F5eXr_Y",
  authDomain: "train-project-b1d57.firebaseapp.com",
  databaseURL: "https://train-project-b1d57.firebaseio.com",
  projectId: "train-project-b1d57",
  storageBucket: "train-project-b1d57.appspot.com",
  messagingSenderId: "461258182447"
};
firebase.initializeApp(config);

var database = firebase.database();
var count = 0
var update = false




function displayEmployee(snapshot){
      
      var startTime = moment(snapshot.val().Start_Time,"HH:mm");
      
      var nextArrival = moment("HH:mm A");
      
      var minutesAway = snapshot.val().Frequency - (moment().diff(startTime,"minutes") % snapshot.val().Frequency);

      nextArrival = moment().add(minutesAway,"minutes").format("hh:mm A");

      if (update === false) {
      $("#trainData").append("<tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>")
      };
      // Getting the first row of the table
      var firstRowTds = $("table")
        .children()
        .eq(1)
        .children("tr")
        .eq(count) //this is the number that needs to change to reference lower rows
        .children("td");

      // Setting the inner text of each td in the first row
      firstRowTds.eq(0).text(snapshot.val().TrainName);

      firstRowTds.eq(1).text(snapshot.val().Destination);

      firstRowTds.eq(2).text(snapshot.val().Frequency);

      firstRowTds.eq(3).text(nextArrival);

      firstRowTds.eq(4).text(minutesAway);

      count++

};



$("#submit").on("click", function() {
  database.ref("/Trains").push({
    TrainName: $("#trainName").val(),
    Destination: $("#destination").val(),
    Start_Time: $("#startTime").val(),
    Frequency: $("#frequency").val(),
  });
    $("#trainName").val("");
    $("#destination").val("");
    $("#startTime").val("");
    $("#frequency").val("");
});


database.ref("/Trains").on("child_added", function(snapshot){
  displayEmployee(snapshot);
});

$("#update").on("click", function(){
  count = 0;
  update = true;
  database.ref("/Trains").on("child_added", function(snapshot){
  displayEmployee(snapshot);
  });
  update = false;
});

