$(document).ready(function() {
    console.log("Page Loaded");

    $("#filter").click(function() {
        makePredictions();
        $("#myModal").modal("show");
    });


});

// call Flask API endpoint
function makePredictions() {

    var watch = $("#watch").val();
    var hour = $("#hour").val();
    var division = $("#division").val();
    var district = $("#district").val();
    var day1 = $("#day").val();
    var nibrs_crime_category = $("#crime_category").val();

    // create the payload
    var payload = {
        "watch": watch,
        "hour": hour,
        "division": division,
        "district": district,
        "day1": day1,
        "nibrs_crime_category": nibrs_crime_category
    }

    // Perform a POST request to the query URL
    $.ajax({
        type: "POST",
        url: "/makePredictions",
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify({ "data": payload }),
        success: function(returnedData) {
            // print it
            console.log(returnedData);

            if (returnedData["prediction"]["point"] == 0) {
                $("#output").html("<h3>Most Likely Outcome is: <b>Arrest</b></h3>");
            } else if (returnedData["prediction"]["point"] == 1) {
                $("#output").html("<h3>Most Likely Outcome is: <b>Clearance</b></h3>");
            } else {
                $("#output").html("<h3>Most Likely Outcome is: <b>Suspension</b></h3>");
            }

            makePlots(returnedData["prediction"]["proba"], parseInt(returnedData["prediction"]["point"]));
            makeTable(returnedData["prediction"]["proba"]);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    });

}

function makePlots(preds2_real, point){

    var colors = ["#0166ce", "#0166ce", "#0166ce"];
    colors[point] = "#2E8540";

    var data = [
        {
          x: ['Arrest', 'Clearance', 'Suspension'],
          y: preds2_real,
          type: 'bar',
          //hovertemplate: '%{y:.2}%',
          marker: {
              color: colors
          }
        }
      ];
    var layout = {
        xaxis: {
            type: "category",
            title: "Status",
            font: {
                size: 12,
            }
        },
        yaxis: {
            title: "Percentage",
            tickformat: ',.0%',
            //hoverformat: '.2r',
            font: {
                size: 12,
                family: "Calibri"
            }
        },
        height: 500,
        width: 500,
        margin: {
            l: 80,
            r: 80,
            b: 80,
            t: 30,
            pad: 0
          },
    }
      
      Plotly.newPlot('myDiv', data, layout);
};

function makeTable(preds2_real) {
    var values = [
        ['Arrest', 'Clearance', 'Suspension'],
        preds2_real.map(x => (100*x).toFixed(2) + "%")];

    var data = [{
        type: 'table',
        header: {
            values: [["<b>Status</b>"], ["<b>Probability</b>"],],
            align: "center",
            line: {width: 1, color: 'black'},
            fill: {color: "#0166ce"},
            font: {family: 'Calibri', size: 18, color: "white"}
        },
        cells: {
            values: values,
            align: "center",
            height: 30,
            line: {color: "black", width: 1},
            font: {family: 'Calibri', size: 18, color: ["black"]}
        }
    }];

    var layout = {
        font: {
            size: 18,
            family: "Calibri"
        }
    };

    Plotly.newPlot('myDiv2', data, layout);
}
