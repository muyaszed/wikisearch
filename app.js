$(document).ready(function(){
 
    $.ajax({
        type: "GET",
        
        url: "http://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=Albert&callback=?",
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            console.log(data.query.search[1].title);
        },
        error: function (errorMessage) {
        }
    });
});
