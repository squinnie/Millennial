// initialise materialize elements
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems);
});

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
});


document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
});

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.datepicker');
  var dateOptions = { format: "dd/mm/yyyy", showClearBtn: "true" }
  var instances = M.Datepicker.init(elems, dateOptions);
});

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.timepicker');
  var timeOptions = { showClearBtn: "true" };
  var instances = M.Timepicker.init(elems, timeOptions);
});

// function to format current time for timepicker
function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

// Date stamp for event
n = new Date();
y = n.getFullYear();
m = n.getMonth() + 1;
d = n.getDate();
var currentDate = d + "/" + m + "/" + y;
document.getElementById("datepicker").value = currentDate;

// Time stamp for event
var dt = new Date();
var currentTime = formatAMPM(dt);
document.getElementById("timepicker").value = currentTime;

// check sliders have been used to set values 
var valenceChanged = false;
var arousalChanged = false;

valence.onchange = function () {
  valenceChanged = true;
}

arousal.onchange = function () {
  arousalChanged = true;
}

// compare string dates in format d/m/y for future date validation
function compareDates(first, second) {
  var firstDate = new Date(first.split('/')[2], first.split('/')[1], first.split('/')[0]);
  var secondDate = new Date(second.split('/')[2], second.split('/')[1], second.split('/')[0]);
  var diff = firstDate.getDate() - secondDate.getDate();

  if (diff > 0) { // first date GREATER THAN second date
    return true;  // true
  } else {        // first date LESS THAN second date
    return false; // false
  }
}

function submit_event() {

  // Get form data
  var date = document.getElementById("datepicker").value;
  var time = document.getElementById("timepicker").value;;
  var eventName = document.getElementById("event_name").value;
  var valence = document.getElementById("valence").value;;
  var arousal = document.getElementById("arousal").value;;
  var notes = document.getElementById("eventNotes").value;
  var rowId = (localStorage.length) + 1;

  // Create event object to store in localStorage
  var event = {
    "name": eventName,
    "date": date,
    "time": time,
    "valence": valence,
    "arousal": arousal,
    "notes": notes
  }

  // Validate DATE present
  if (
    date == ''
  ) {
    M.toast({ html: 'Event Date must have a value.', classes: 'grey rounded' })
  }
  // Validate DATE not in future
  if (
    compareDates(date, currentDate)
  ) {
    M.toast({ html: 'Event Date cannot be in the future.', classes: 'grey rounded' })
  }
  // Validate TIME
  if (
    time == ''
  ) {
    M.toast({ html: 'Event Time must have a value.', classes: 'grey rounded' })
  }
  // Validate NAME
  if (
    eventName == ''
  ) {
    M.toast({ html: 'Event Name must have a value.', classes: 'grey rounded' })
  }
  // Validate VALENCE
  if (
    valenceChanged == false
  ) {
    M.toast({ html: 'Valence must be set using the slider.', classes: 'grey rounded' })
  }
  // Validate AROUSAL
  if (
    arousalChanged == false
  ) {
    M.toast({ html: 'Arousal must be set using the slider.', classes: 'grey rounded' })
  }
  // Validate ALL FIELDS and save to storage
  if (
    eventName != '' &&
    date != '' && 
    compareDates(date, currentDate) == false && //date not in future
    time != '' &&
    valenceChanged == true &&
    arousalChanged == true
  ) {
    window.localStorage.setItem(rowId, JSON.stringify(event));
    console.log("Data saved to localStorage: " + JSON.stringify(event));

    // reset the page for new entry
    window.alert("Event Submitted.");
    location.reload();
  }


};

