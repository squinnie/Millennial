
// get data from localStorage dataSet

var graphData = [];
for (i = 1; i < localStorage.length + 1; i++) {

  logEvent = JSON.parse(localStorage.getItem(i));
  if (logEvent != null) {

    eventValence = parseInt(logEvent.valence);
    eventArousal = parseInt(logEvent.arousal);
    eventDate = logEvent.date;
    var rowData = [eventDate, eventValence, eventArousal];
    console.log(rowData);
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

  console.log(graphData);

  data.addRows(graphData);

  var options = {
    hAxis: {
      title: 'Date'
    },
    vAxis: {
      title: 'Valence/Arousal Rating'
    },
    series: {
      0: { color: 'blue', visibleInLegend: false },
      1: { color: 'red', visibleInLegend: false },
    }
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
    title: 'Valence & Arousal',
    legend: {position: 'top'},
    hAxis: {
      title: 'Event Date',
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

// google.charts.load('current', { 'packages': ['bar'] });
// google.charts.setOnLoadCallback(drawChart);

// function drawChart() {
//   var headerDataRow = ['Date', 'Valence', 'Arousal'];
//   graphData.unshift(headerDataRow); // add to top of dataset - required for this chart type
//   var data = google.visualization.arrayToDataTable(graphData);

//   var options = {
//     chart: {
//       title: 'Valence and Arousal per Event'
//     },
//     // orientation: 'vertical',
//     series: {
//       0: { color: 'blue', visibleInLegend: false },
//       1: { color: 'red', visibleInLegend: false },
//     },
//     hAxis: { showTextEvery: 0, slantedText: true, slantedTextAngle: 90 }
//   }

//   var chart = new google.charts.Bar(document.getElementById('columnchart_material'));

//   chart.draw(data, google.charts.Bar.convertOptions(options));
// }

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
});

