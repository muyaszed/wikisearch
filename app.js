$(document).ready(function(){
    
    

    var myQuery = "";
    $( "form" ).on( "submit", function( event ) {
        
        content = "";
      event.preventDefault();
      myQuery = $("#search").val();
        console.log(myQuery);
        $.ajax({
        type: "GET",
        
        url: "http://en.wikipedia.org/w/api.php?action=query&format=json&list=search&titles=&generator=search&srsearch="+myQuery+"&gsrsearch=" + myQuery + "&gsrlimit=10&callback=?",
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            var searchResult = data.query.search;
            var dataResult = data.query.pages;
            console.log(searchResult);
            console.log(dataResult);
            for(i=0; i<searchResult.length; i++) {
                
                for(prop in dataResult) {
                    
                    if(dataResult[prop].title === searchResult[i].title) {
                        
                        searchResult[i]["pageid"] = dataResult[prop].pageid;
                    }
                }

            }
            console.log(searchResult);
 
            displaySearch(searchResult);
        },
        error: function (errorMessage) {
        }
    });
    });
 
    
    
    function displaySearch(results) {
        var content = "";
        for(i=0; i<results.length; i++) {
//            console.log(pages[prop].title);
            content += "<h1>" + results[i].title + "</h1><br><br><p><a href='https://en.wikipedia.org/?curid=" + results[i].pageid + "' target='blank'>" + results[i].snippet + "</a></p>"
        }
//        
        
        console.log(content);
        $("#show-results").html(content);
    };
});
