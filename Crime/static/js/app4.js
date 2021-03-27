var viz;

$(document).ready(function() {
    initializeF1();
    initializeF2();
});

function initializeF1() {
    var placeholderDiv = document.getElementById("tableauF1");
    var url = "https://public.tableau.com/views/Model1FeatureImportances/Sheet1?:language=en&:display_count=y&:origin=viz_share_link";
    var options = {
        width: placeholderDiv.offsetWidth,
        height: placeholderDiv.offsetHeight,
        hideTabs: true,
        hideToolbar: true,
        // onFirstInteractive: function() {
        //     workbook = viz.getWorkbook();
        //     activeSheet = workbook.getActiveSheet();
        // }
    };
    viz = new tableau.Viz(placeholderDiv, url, options);
}

function initializeF2() {
    var placeholderDiv = document.getElementById("tableauF2");
    var url = "https://public.tableau.com/views/Model2FeatureImportances/Sheet1?:language=en&:display_count=y&publish=yes&:origin=viz_share_link";
    var options = {
        width: placeholderDiv.offsetWidth,
        height: placeholderDiv.offsetHeight,
        hideTabs: true,
        hideToolbar: true,
        // onFirstInteractive: function() {
        //     workbook = viz.getWorkbook();
        //     activeSheet = workbook.getActiveSheet();
        // }
    };
    viz = new tableau.Viz(placeholderDiv, url, options);
}