

var config = {
    apiKey: "AIzaSyAlymNtfOTAgwWMItAn99BPZXpqaakzohc",
    authDomain: "train-scheduler-abf00.firebaseapp.com",
    databaseURL: "https://train-scheduler-abf00.firebaseio.com",
    projectId: "train-scheduler-abf00",
    storageBucket: "",
    messagingSenderId: "773353248063"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();
  setInterval(function() {$("#day").text(moment().format('LLL'));}, 1000);
  
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  

    var tName = $("#train-name-input").val().trim();
    var tDes = $("#destination-input").val().trim();
    var tFt = $("#ftt-input").val().trim(); 
    // moment($("#ftt-input").val().trim(), "MM/DD/YYYY").format("X");
    var tFq = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      Name: tName,
      Destination: tDes,
      FirstTrainTime: tFt,
      Frequency: tFq
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);
  
  

  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#ftt-input").val("");
    $("#frequency-input").val("");
  });
  
  var newRow
  database.ref().on("child_added", function(childSnap) {
    
  
    // Store everything into a variable.
    var trainName = childSnap.val().Name;
    var trainDes = childSnap.val().Destination;
    var trainFreq = childSnap.val().Frequency;


  console.log(trainName);
  console.log(trainDes);
  // console.log(trainFTime);
  console.log(trainFreq);

  
    // Create the new row
      newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDes),
      $("<td>").text(trainFreq),
    );
  
    // Append the new row to the table
    $("#train-table").append(newRow);
  });


/// need to code next arrival and minutes away outside of the .on child added function so it
/// is continuously updated
  var currentTime = moment().format('LT');
  console.log(currentTime);
  
    newRow.append(
    $("<tr>").append(setInterval(function() {
    $("<td>").text(parseInt(currentTime));
    console.log(currentTime);
}, 1000)));
