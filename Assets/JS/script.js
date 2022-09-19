var time = moment().format("LLLL");
hourlyTime = moment("8 am", "hh a").format("h:mm");
var timeLabel = $(".time");
console.log(timeLabel)
var calendarContainer = document.getElementById("calendar-content-container");
console.log(calendarContainer)
var calendarRow = document.createElement("form")
// var calendarRow = $("form")
calendarRow.setAttribute("class", "row time-block")
var calendarTime = document.createElement("label");
calendarTime.setAttribute("class", "col-2 hour");
calendarTime.setAttribute("name", "time");
calendarTime.setAttribute("for", "hr1")
var calendarInfo = document.createElement("input");
calendarInfo.setAttribute("class", "col-8 description textarea")
calendarInfo.setAttribute("type", "text");
calendarInfo.setAttribute("name", "hr1")
var calendarSave = document.createElement("div");
calendarSave.setAttribute("class", "col-2")
var saveBtn = document.createElement("button")
saveBtn.setAttribute("class", "saveBtn col-2")
saveBtn.setAttribute("type", "submit")
var timeIndex = 10;

inIt();
setInterval(clock, 1000)

function inIt() {
    $("#currentDay").text(time);
    timeLabel.text(hourlyTime);
    // console.log(timelabel);
    populateCalendar();
}

function clock() {
    $("#currentDay").text(time);
    time = moment().format("LLLL")
}



function populateCalendar() {
    for (var i = 0; i < timeIndex; i++)
    calendarContainer.appendChild(calendarRow);
    calendarRow.appendChild(calendarTime);
    calendarTime.textContent = hourlyTime;
    calendarRow.appendChild(calendarInfo);
    calendarInfo.textContent = "WAKE UP! DONT SLEEP IN!"
    calendarRow.appendChild(saveBtn);
    // calendarSave.append(saveBtn);
}