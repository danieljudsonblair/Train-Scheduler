// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
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
  
  // 2. Button for adding Employees
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
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
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
 
    // alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#ftt-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnap) {
    
  
    // Store everything into a variable.
    var trainName = childSnap.val().Name;
    var trainDes = childSnap.val().Destination;
    var trainFTime = childSnap.val().FirstTrainTime;
    var trainFreq = childSnap.val().Frequency;

  
    // Prettify the employee start
    var empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");
  
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var empMonths = moment().diff(moment(empStart, "X"), "months");
    console.log(empMonths);
  
    // Calculate the total billed rate
    var empBilled = empMonths * empRate;
    console.log(empBilled);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDes),
    //   $("<td>").text(empStartPretty),
      $("<td>").text(trainFTime),
      $("<td>").text(trainFreq),
    //   $("<td>").text(empBilled)
    );
  
    // Append the new row to the table
    $("#train-table").append(newRow);
  });
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case
  