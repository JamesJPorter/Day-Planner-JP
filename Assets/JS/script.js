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
setInterval(colorCoding, 1000);

function inIt() {
  $("#currentDay").text(time);
  colorCoding();
  //   timeLabel.text(hourlyTime);
  var initStorage = JSON.parse(localStorage.getItem("calendarStorage"));
  if (initStorage != null) {
    for (var i = 0; i < initStorage.length; i++) {
      calendarStructure.push(initStorage[i]);
    }
  }
  populateCalendar();
}

function clock() {
  $("#currentDay").text(time);
  time = moment().format("LLLL");
}

function colorCoding() {
  $(".time-block").each(function () {
    var currentHour = moment().hour();
    var currentBlockHour = $(this).data().hour;
    // console.log(currentHour)
    // console.log(currentBlockHour)
    if (currentHour == currentBlockHour) {
      $(this).children(".description").addClass("present");
      $(this).children(".description").removeClass("future past");
    } else if (currentHour < currentBlockHour) {
      $(this).children(".description").addClass("future");
      $(this).children(".description").removeClass("present past");
    } else {
      $(this).children(".description").addClass("past");
      $(this).children(".description").removeClass("future present");
    }
  });
}

function populateCalendar() {
  for (var i = 0; i < timeIndex; i++) {
    var startTime = i + 8;
    if (calendarStructure) {
      calendarStructure.forEach(function (entry, idx) {
        if (entry[idx].hourIndex === startTime) {
          calendarTime.attr({ class: "col-1 hour", name: "time", for: "hr1" });
          calendarInfo.attr({
            class: "col-10 description textarea",
            type: "text",
            name: "hr1",
          });
          var hourlyTimeEdit = moment(startTime, "hh a").format("h:mm a");
          var calendarFormEdit = $("<form></form>");
          var calendarTimeEdit = $("<label></label>");
          var calendarInfoEdit = $("<input></input>");
          var saveBtnEdit = $("<button></button>");
          var saveIconEdit = $("<i></i>");
          saveBtnEdit.attr({ class: "saveBtn col-1", type: "submit" });
          calendarFormEdit.attr("class", "row time-block");
          calendarFormEdit.attr("data-hour", startTime);
          saveIconEdit.attr("class", "fas fa-save");

          calendarContainer.append(calendarForm);
          calendarTimeEdit.text(hourlyTimeEdit);
          calendarFormEdit.append(calendarTimeEdit);
          calendarInfoEdit.val(calendarStructure[idx].hourTask);
          console.log(calendarStructure[idx].hourTask);
          calendarFormEdit.append(calendarInfoEdit);
          calendarFormEdit.append(saveBtnEdit);
          saveBtnEdit.append(saveIconEdit);
        }
      });
    }
    var hourlyTime = moment(startTime, "hh a").format("h:mm a");
    var calendarForm = $("<form></form>");
    var calendarTime = $("<label></label>");
    var calendarInfo = $("<input></input>");
    var saveBtn = $("<button></button>");
    var saveIcon = $("<i></i>");

    calendarTime.attr({ class: "col-1 hour", name: "time", for: "hr1" });
    calendarInfo.attr({
      class: "col-10 description textarea",
      type: "textarea",
      name: "hr1",
    });
    saveBtn.attr({ class: "saveBtn col-1", type: "submit" });
    calendarForm.attr("class", "row time-block");
    calendarForm.attr("data-hour", startTime);
    saveIcon.attr("class", "fas fa-save");

    calendarContainer.append(calendarForm);
    calendarTime.text(hourlyTime);
    calendarForm.append(calendarTime);
    calendarInfo.val("Your task here");
    calendarForm.append(calendarInfo);
    calendarForm.append(saveBtn);
    saveBtn.append(saveIcon);
  }
  colorCoding();
}

$("#calendar-content-container").on("click", ".saveBtn", function (event) {
  event.preventDefault();

  var thisHour = $(this).parent().data().hour;
  var thisTask = $(this).siblings(".description").val();

  var existingIndex;
  console.log("calendarStructure", calendarStructure);
  calendarStructure.forEach(function (entry, idx) {
    console.log("entry", entry);
    if (entry.hourIndex === thisHour) {
      console.log("found it!");
      existingIndex = idx;
    }
  });

  console.log("existingIndex", existingIndex);
  if (existingIndex) {
    calendarStructure[existingIndex].hourTask = thisTask;
  } else {
    var calendarEntry = {
      hourIndex: thisHour,
      hourTask: thisTask,
    };
    calendarStructure.push(calendarEntry);
  }

  localStorage.setItem("calendarStorage", JSON.stringify(calendarStructure));
});
