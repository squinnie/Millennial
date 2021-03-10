document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
  });


if (localStorage.length == 0){
      alertText = document.createElement("P");
      alertText.innerText = "Please begin logging entries to view your history here.";

      span = document.createElement("SPAN");
      span.className = "card-title";
      span.classList.add("span_center");
      span.innerText = "No Log Entries";

      divInner = document.createElement("DIV");
      divInner.className = "card-content white-text";

      divInner2 = document.createElement("DIV");
      divInner2.className = "card blue-grey darken-1";

      divCol = document.createElement("DIV");
      divCol.className = "col s12 m6";

      divRow = document.createElement("DIV");
      divRow.className = "row";

      // append / form elements
      divInner.appendChild(span);
      divInner.appendChild(alertText);
      divInner2.appendChild(divInner);
      divCol.appendChild(divInner2);
      divRow.appendChild(divCol);
    
      //display on  page
      document.getElementById("card_div").appendChild(divRow);
}



  for (i = 1; i<localStorage.length+1; i++){

    logEvent = JSON.parse(localStorage.getItem(i));
    if (logEvent != null){


      pValence = document.createElement("P");
      pValence.innerText = "Valence: " + logEvent.valence;

      pArousal = document.createElement("P");
      pArousal.innerText = "Arousal: " + logEvent.arousal;

      pDate = document.createElement("P");
      pDate.innerText = "Date: " + logEvent.date;

      pTime = document.createElement("P");
      pTime.innerText = "Time: " + logEvent.time;


      pNotesTitle = document.createElement("P");
      pNotesTitle.innerText = "Notes:";

      pNotes = document.createElement("P");
      pNotes.innerText = logEvent.notes;

      span = document.createElement("SPAN");
      span.className = "card-title";
      span.classList.add("span_center");
      span.innerText = logEvent.name;

      divInner = document.createElement("DIV");
      divInner.className = "card-content white-text";

      divInner2 = document.createElement("DIV");
      divInner2.className = "card blue-grey darken-1";

      divCol = document.createElement("DIV");
      divCol.className = "col s12 m6";

      divRow = document.createElement("DIV");
      divRow.className = "row";

      br = document.createElement("BR");
      br2 = document.createElement("BR");


      //table for card 
      table = document.createElement("TABLE");
      tr1 = document.createElement("TR");
      tr2 = document.createElement("TR");
      th1 = document.createElement("TH");
      th2 = document.createElement("TH");
      th3 = document.createElement("TH");
      th4 = document.createElement("TH");
      // append to table
      table.appendChild(tr1);
      table.appendChild(tr2);

      tr1.appendChild(th1);
      tr1.appendChild(th2);

      tr2.appendChild(th3);
      tr2.appendChild(th4);
    
      th1.appendChild(pDate);
      th2.appendChild(pValence);
      th3.appendChild(pTime);
      th4.appendChild(pArousal);

      
      // append / form elements
      divInner.appendChild(span);
      divInner.appendChild(table);
      divInner.appendChild(br);
      divInner.appendChild(pNotesTitle);
      divInner.appendChild(br2);
      divInner.appendChild(pNotes);
      divInner2.appendChild(divInner);
      divCol.appendChild(divInner2);
      divRow.appendChild(divCol);
    
      //display on  page
      document.getElementById("card_div").appendChild(divRow);
  

    }
  }



 