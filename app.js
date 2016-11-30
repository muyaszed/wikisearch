$(document).ready(function(){
    
 /**********Data collection and display*************/     

    var myQuery = "";
  
    //trigger event when form is submit
    $( "form" ).on( "submit", function( event ) {
        
        content = "";
        //stop form submitting and page refresh
      event.preventDefault();
      myQuery = $("#search").val();
        console.log(myQuery);
        
        //gathers api data from wikipidia
        $.ajax({
        type: "GET",
        
        url: "http://en.wikipedia.org/w/api.php?action=query&format=json&list=search&titles=&generator=search&srsearch="+myQuery+"&gsrsearch=" + myQuery + "&gsrlimit=10&callback=?",
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
            
        //callback function when data is succesfully fetch
        success: function (data, textStatus, jqXHR) {
            var searchResult = data.query.search;
            var dataResult = data.query.pages;
            console.log(searchResult);
            console.log(dataResult);
            
            //rearrange required data
            for(i=0; i<searchResult.length; i++) {
                
                for(prop in dataResult) {
                    
                    if(dataResult[prop].title === searchResult[i].title) {
                        
                        searchResult[i]["pageid"] = dataResult[prop].pageid;
                    }
                }

            }
            console.log(searchResult);
            
            //move search box
            afterSearch();
 
            //call a function to append result to index.html
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
            content += "<a href='https://en.wikipedia.org/?curid=" + results[i].pageid + "' target='blank'><div class='search-item'><h1>" + results[i].title + "</h1><br><br><p>" + results[i].snippet + "</p></div></a>"
        }
//        
        
        console.log(content);
        $("#show-results").html(content).effect("slide", {direction: "down"}, 1000);
    };
    
/*************front end effects*************/
    
    
//search box shifting

function afterSearch() {
    var searchBoxOption = {
        duration: 300,
        easing: "linear"
    }

    $(".search-area").addClass("after-search", searchBoxOption);
}
    
//input on focus animation
    
var boxInputOption = {
    duration: 500,
    easing: "swing"
}
    
$("#search").focus(function() {
    $("#search").addClass("box-input", boxInputOption);
    setTimeout(function() {
               $("#cross").css("display", "block")
               }, 500);
});

    
});
