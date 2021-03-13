// initialise materialize elements
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
});

if (localStorage.length != 0) {
  // number of entries
  var numEntries = localStorage.length;

  // calculate avg valence + arousal
  var tempTotalV = 0;
  var tempTotalA = 0;
  for (i = 1; i < localStorage.length + 1; i++) {
    logEvent = JSON.parse(localStorage.getItem(i));
    if (logEvent != null) {
      tempTotalV = tempTotalV + parseInt(logEvent.valence);
      tempTotalA = tempTotalA + parseInt(logEvent.arousal);
    }
  }
  var avgValence = (tempTotalV / numEntries).toFixed(2); // calc average to 2 DP
  var avgArousal = (tempTotalA / numEntries).toFixed(2); // calc average to 2 DP

  // set label values
  document.getElementById("events_num_label").innerHTML = numEntries;
  document.getElementById("avg_valence_label").innerHTML = avgValence;
  document.getElementById("avg_arousal_label").innerHTML = avgArousal;
}

// get data from localStorage dataSet
var graphData = [];
for (i = 1; i < localStorage.length + 1; i++) {

  logEvent = JSON.parse(localStorage.getItem(i));
  if (logEvent != null) {

    eventValence = parseInt(logEvent.valence);
    eventArousal = parseInt(logEvent.arousal);
    eventDate = logEvent.date;
    var rowData = [eventDate, eventValence, eventArousal];
    //console.log(rowData);
    graphData.push(rowData);

  }
}

// GOOGLE CHARTS LINE GRAPH
google.charts.load('current', { packages: ['corechart', 'line'] });
google.charts.setOnLoadCallback(drawCurveTypes);

function drawCurveTypes() {
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'X');
  data.addColumn('number', 'Valence');
  data.addColumn('number', 'Arousal');

  //console.log(graphData);

  data.addRows(graphData);

  var options = {
    hAxis: {
      title: 'Date',
      viewWindow: {
        min: [7, 30, 0],
        max: [17, 30, 0]
      }
    },
    vAxis: {
      title: 'Rating (scale of 1-10)'
    },
    legend: { position: 'top' }
  };

  var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}

google.charts.load('current', { packages: ['corechart', 'bar'] });
google.charts.setOnLoadCallback(drawMultSeries);


// GOOGLE CHARTS COLUMN GRAPH
function drawMultSeries() {
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'X');
  data.addColumn('number', 'Valence');
  data.addColumn('number', 'Arousal');
  data.addRows(graphData);


  var options = {
    legend: { position: 'top' },
    hAxis: {
      title: 'Date',
      viewWindow: {
        min: [7, 30, 0],
        max: [17, 30, 0]
      }
    },
    vAxis: {
      title: 'Rating (scale of 1-10)'
    }
  };

  var chart = new google.visualization.ColumnChart(
    document.getElementById('chart_div2'));

  chart.draw(data, options);
}
