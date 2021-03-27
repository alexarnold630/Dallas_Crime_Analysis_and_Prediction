$(document).ready(function() {
    // var dateFilter = $("#year").val(); //gets input value to filter
    buildTable(); 
    // buildTable(dateFilter);
    //Event Listeners
    $("#filter-btn").on("click", function(e) {
        e.preventDefault();
        buildTable();
    });
    $("#filter-clear").on("click", function(e) {
        e.preventDefault();
        resetFilters();
        buildTable();
    });
    $("#form").on("submit", function(e) {
        e.preventDefault();
        buildTable();
    });   
}); 

function resetFilters() {
    $("#watch").val("");

    $("#hour").val("");
    $("#hour").text("");

    // $("#latitude").val("");
    // $("#latitude").text("");

    $("#division").val("");

    $("#district").val("");

    $("#day").val("");

    $("#crime_category").val("");


}

function buildTable() {
    d3.csv("static/data/datatable2.csv").then(function(crimeData) {

        var watchFilter = parseInt($("#watch").val()); 
        var hourFilter = parseInt($("#hour").val());
        // var latitudeFilter = parseFloat(($("#latitude").val()));
        var divisionFilter = $("#division").val();
        var districtFilter = $("#district").val();
        var dayFilter = $("#day").val();
        var crimeFilter = $("#crime_category").val();

        // apply filters
        var filteredData = crimeData

        if (watchFilter) {
           filteredData = filteredData.filter(row => parseInt(row.watch) === (watchFilter));
           }
        if (hourFilter) {
            filteredData = filteredData.filter(row => parseInt(row.hour) === (hourFilter))
            } 
        // if (latitudeFilter) {
        //     filteredData = filteredData.filter(row => parseFloat(row.latitude) === parseFloat(latitudeFilter));
        //     } 
        if (divisionFilter) {
            filteredData = filteredData.filter(row => (row.division) === (divisionFilter));
            } 
        if (districtFilter) {
            filteredData = filteredData.filter(row => (row.district) === (districtFilter));
            } 
        if (dayFilter) {
            filteredData = filteredData.filter(row => (row.day1) === (dayFilter));
            } 
        if (crimeFilter) {
            filteredData = filteredData.filter(row => (row.nibrs_crime_category) === (crimeFilter));
            } 
       // // see if we have any data left
       if (filteredData.length === 0) {
           alert("No Data Found!");
       } else {
            filteredData.forEach(function(row) {
                row.latitude = parseFloat(row.latitude).toFixed(2);
                row.longitude = parseFloat(row.longitude).toFixed(2)
            })
       }
            
        buildTableString(filteredData);
    }); 
}

function buildTableString(crimeData) {

    // JQUERY creates an HTML string
    var tbody = $("#table>tbody");
    //clear table
    tbody.empty();

    //destroy datatable
    $("table").DataTable().clear().destroy();

    var datarows = crimeData.map(x => [x["watch"], x["division"], x["district"], x["month1"],  x["day1"], x["status"], x["nibrs_crime_category"] ,x["hour"],x["latitude"],x ["longitude"]])

    //redraw
    $("#table").DataTable({

        data: datarows,
        "defaultContent": "", 

        "pageLength": 15, 
        dom: 'Bfrtip', //lbfrtip if you want the length changing thing
        buttons: [
            { extend: 'copyHtml5' },
            { extend: 'excelHtml5' },
            { extend: 'csvHtml5' },
            {
                extend: 'pdfHtml5',
                title: function() { return "Dallas Crime Data"; },
                orientation: 'portrait',
                pageSize: 'LETTER',
                text: 'PDF',
                titleAttr: 'PDF'
            }
        ]
    });
}; 