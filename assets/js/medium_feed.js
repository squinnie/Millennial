$(document).ready(function () {
    $.get("https://c9cymjqiil.execute-api.us-east-2.amazonaws.com/Prod/medium", function (data, status) {
        alert("Data: " + data + "\nStatus: " + status);
    });

});