

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
setInterval(function () { $("#day").text(moment().format('LLLL')); }, 1000);
var currentTime = setInterval(function() {moment().format('LT')}, 1000);
console.log(currentTime);
$("#add-train-btn").on("click", function (event) {
  event.preventDefault();


  var tName = $("#train-name-input").val().trim();
  var tDes = $("#destination-input").val().trim();
  var tFt = $("#ftt-input").val().trim();
  var tFq = $("#frequency-input").val().trim();

  // Creates local temp object
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
database.ref().on("child_added", function (childSnap) {


  // Store everything into a variable.
  var trainName = childSnap.val().Name;
  var trainDes = childSnap.val().Destination;
  var trainFreq = childSnap.val().Frequency;
  // var nextArv = ""
  // if (currentTime < $("#ftt-input").val().trim()) {
  //   nextArv = childSnap.val().FirstTrainTime; 
  // }

    // console.log(trainName);
    // console.log(trainDes);
    // // console.log(trainFTime);
    // console.log(trainFreq);


    // Create the new row
    newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDes),
      $("<td>").text(trainFreq)
      // next arrival = last departure (static) + frequency or if current date !== date of 
      // last departure then next arrival = first train time
      // minutes away = current time - most recent arrival
      // I am assuming this will require the last 2 colums to be within a setInterval function
    );

  // Append the new row to the table
  $("#train-table").append(newRow);
});


/// need to code next arrival and minutes away outside of the .on child added function so it
/// is continuously updated

