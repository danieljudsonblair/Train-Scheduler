

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

setInterval(function () { $("#day").text(moment().format('LL')); }, 1000);
// Add a train
$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  var tName = $("#train-name-input").val().trim();
  var tDes = $("#destination-input").val().trim();
  var tFt = $("#ftt-input").val().trim();
  var tFq = $("#frequency-input").val().trim();
  
  // Create local temp object
  var newTrain = {
    Name: tName,
    Destination: tDes,
    FirstTrainTime: tFt,
    Frequency: tFq
  };

  // Uploads train data to firebase
  database.ref().push(newTrain);

  // Clear all text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#ftt-input").val("");
  $("#frequency-input").val("");
});

database.ref().on("child_added", function (childSnap) {


  // Convenience variables
  var trainName = childSnap.val().Name;
  var trainDes = childSnap.val().Destination;
  var trainFreq = childSnap.val().Frequency;
  var trainFtt = childSnap.val().FirstTrainTime

  // Time and frequency calculations
  var firstTimeConverted = moment(trainFtt, "HH:mm").subtract(1, "years");
  var currentTime = moment();
  var diffTime = currentTime.diff(moment(firstTimeConverted), "minutes");
  var tRemainder = diffTime % trainFreq;
  var tMinutesTillTrain = trainFreq - tRemainder;
  var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("LT");

  var newRow
  // Create the new row
  newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDes),
    $("<td style='text-align: center'>").text(trainFreq),
    $("<td style='text-align: center'>").text(nextTrain),
    $("<td style='text-align: center'>").text(tMinutesTillTrain)
  );

  $("#train-table").append(newRow);
});


