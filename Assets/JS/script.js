var time = moment().format("LLLL");
var startTime = 8;
hourlyTime = moment(startTime, "hh a").format("h:mm");
var timeLabel = $(".time");
console.log(timeLabel);
var calendarContainer = $("#calendar-content-container");
console.log(calendarContainer);
var calendarTime = $("<label></label>");
calendarTime.attr({ class: "col-2 hour", name: "time", for: "hr1" });
var calendarInfo = $("<input></input>");
calendarInfo.attr({
  class: "col-8 description textarea",
  type: "text",
  name: "hr1",
});
var calendarSave = $("<div></div>");
calendarSave.attr("class", "col-2");
var saveBtn = $("<button></button>");
saveBtn.attr({ class: "saveBtn col-2", type: "submit" });
saveBtn.attr("type", "submit");
var timeIndex = 10;
var calendarStructure = [];

inIt();
setInterval(clock, 1000);

function inIt() {
  $("#currentDay").text(time);
  timeLabel.text(hourlyTime);
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

for (var i = 0; i < timeIndex; i++) {
  calendarStructure.push(populateCalendar[i]);
  localStorage.setItem("calendarStorage", JSON.stringify(calendarStructure));
  console.log(calendarStructure);
}

function populateCalendar() {
    for ( var i = 0; i < timeIndex; i++)
  var calendarForm = $("<form></form>");
  calendarForm.attr("class", "row time-block");
  calendarContainer.append(calendarForm);
  calendarForm.append(calendarTime);
  startTime += i;
  calendarTime.text(hourlyTime);
  calendarForm.append(calendarInfo);
  calendarInfo.val("WAKE UP! DONT SLEEP IN!");
  calendarForm.append(saveBtn);
}
