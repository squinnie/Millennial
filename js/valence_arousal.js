// initialise materialize elements
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
  });

  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
  });


  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  });

// Date stamp for event
n =  new Date();
y = n.getFullYear();
m = n.getMonth() + 1;
d = n.getDate();
var date =  m + "/" + d + "/" + y;
document.getElementById("date").innerHTML = date;

// Time stamp for event
var dt = new Date();
var time = dt.toLocaleTimeString();
document.getElementById("time").innerHTML = time;

// check sliders have been used to set values 
var valenceChanged = false;
var arousalChanged = false;

valence.onchange = function(){
  valenceChanged = true;
}

arousal.onchange = function(){
  arousalChanged = true;
}


function submit_event(){

    // Get form data
    var eventName = document.getElementById("event_name").value;
    var valence = document.getElementById("valence").value;;
    var arousal = document.getElementById("arousal").value;; 
    var notes = document.getElementById("eventNotes").value;
    var rowId = (localStorage.length)+1;

    // Create event object to store in localStorage
    var event = {
      "name": eventName,
      "date": date,
      "time": time,
      "valence": valence,
      "arousal": arousal,
      "notes": notes
    }

    // Validate NAME
    if (
      eventName == ''
    ){
      M.toast({html: 'Event Name must have a value.', classes: 'grey rounded'})
    }
    // Validate VALENCE
    if (
      valenceChanged == false
    ){
      M.toast({html: 'Valence must be set using the slider.', classes: 'grey rounded'})
    }
    // Validate AROUSAL
    if (
      arousalChanged == false
    ){
      M.toast({html: 'Arousal must be set using the slider.', classes: 'grey rounded'})
    }
    // Validate ALL and save to storage
    if (
      eventName != '' &&
      valenceChanged == true &&
      arousalChanged == true
    ){
      window.localStorage.setItem(rowId, JSON.stringify(event));
      console.log("Data saved to localStorage: " + JSON.stringify(event));
      // DEBUGGING 
      // console.log(event);
      // console.log(localStorage.length);

      // reset the page for new entry
      window.alert("Event Submitted.");
     location.reload();
    }

    
};

 