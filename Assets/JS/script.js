var time = moment().format("LLLL");
// hourlyTime = moment(startTime, "hh a").format("h:mm");
var timeLabel = $(".time");
console.log(timeLabel);
var calendarContainer = $("#calendar-content-container");
console.log(calendarContainer);
var calendarSave = $("<div></div>");
calendarSave.attr("class", "col-2");
var timeIndex = 10;
var calendarStructure = [];
var saveBtn = $("<button></button>");
var calendarTime = $("<label></label>");
var calendarForm = $("<form></form>");
inIt();
setInterval(clock, 1000);

function inIt() {
  $("#currentDay").text(time);
  colorCoding();
  //   timeLabel.text(hourlyTime);
  var initStorage = JSON.parse(localStorage.getItem("calendarStorage"));
  if (initStorage != null) {
    for (var i = 0; i < initStorage.length; i++) {
      calendarStructure.push(initStorage[i]);
      console.log(calendarStructure);
    }
  }
  populateCalendar();
}

function clock() {
  $("#currentDay").text(time);
  time = moment().format("LLLL");
}

// for (var i = 0; i < timeIndex; i++) {
//   calendarStructure.push(populateCalendar[i]);
//   localStorage.setItem("calendarStorage", JSON.stringify(calendarStructure));
//   console.log(calendarStructure);
// }

function colorCoding() {
    if (calendarTime == $("#currentDay").text()) {
      calendarForm.attr("class", "present");
    } else if (calendarTime > $("#currentDay").text()) {
      calendarForm.attr("class", "future");
    } else {
      calendarForm.attr("class", "past");
    }
  }


function populateCalendar() {
  for (var i = 0; i < timeIndex; i++) {
    var startTime = i + 8;
    var hourlyTime = moment(startTime, "hh a").format("h:mm");
    var calendarForm = $("<form></form>");
    var calendarTime = $("<label></label>");
    var calendarInfo = $("<input></input>");
    var saveBtn = $("<button></button>");

    calendarTime.attr({ class: "col-1 hour", name: "time", for: "hr1" });
    calendarInfo.attr({
      class: "col-10 description textarea",
      type: "text",
      name: "hr1",
    });
    saveBtn.attr({ class: "saveBtn col-1", type: "submit" });
    calendarForm.attr("class", "row time-block");

    calendarContainer.append(calendarForm);
    calendarTime.text(hourlyTime);
    calendarForm.append(calendarTime);
    calendarInfo.val("Your task here");
    calendarForm.append(calendarInfo);
    calendarForm.append(saveBtn);
  }
  colorCoding()
}

$("button").click(function (submit) {
  submit.preventDefault();
  var calendarEntry = {
    hourIndex: "",
    hourTask: "",
  };
  calendarEntry.hourIndex = $(".hour").text();
  console.log(calendarEntry.hourIndex);
  calendarEntry.hourTask = $(".textarea").val();
  calendarStructure.push(calendarEntry);
  console.log(calendarStructure);
  localStorage.setItem("calendarStorage", JSON.stringify(calendarStructure));
});
