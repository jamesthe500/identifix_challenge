$(document).ready(function() {
    $('#submitbtn').on('click',( function(){
        var searchTerms= $("#searchfield").val().replace("'","");

        $.getJSON("http://www.carqueryapi.com/api/0.3/?callback=?", {cmd:"getTrims", keyword:searchTerms}, function(data) {
            $('#results').empty();
            console.log(data);

            var trims = data.Trims;
            if (trims.length == 0){
                $('#results').append("<div class='noResults'>Sorry, that search returned no results. Please check your spelling, make sure you've included all the necessary terms, and try again.</div>");
            }

            for(i=0; i < trims.length; i++) {
                var liters = Math.round(trims[i].model_engine_cc / 100)/10;
                var engineType = "";
                if (trims[i].model_engine_type == "V"){
                    engineType = trims[i].model_engine_type + trims[i].model_engine_cyl;
                } else {
                    engineType = trims[i].model_engine_type + " " + trims[i].model_engine_cyl;
                }
                var trimResult = "";
                if (trims[i].model_trim !== ""){
                    trimResult = "<div class='trim resultLine'>Trim: " + trims[i].model_trim + "</div>";
                }
                $('#results').append("<div class='trimResult resultLine'><div class='headline'>" + trims[i].model_year + " " + trims[i].make_display + " " + trims[i].model_name + "</div>" + trimResult + "<div class='engine resultLine'>Engine: " + liters  + "L " + engineType + "</div></div>")

            }
        });
    }));
}); // end of doc ready



/*<div class='roomInfo'><h2 class='room text" + isLongRoom + "'>" + roomArray[i].roomNumber + "</h2><div class='icons'>" + computerIcon(i) + "<div class='icon theCapacityNum" + digits + "'>" + roomArray[i].capacity + "</div></div></div><div class='bookers'><button class='thirty btn btn-book bookerA' id='" + roomArray[i].roomNumber + "'><span class='glyphicon glyphicon-arrow-right' aria-hidden='true'></span>" + thirtyTime + "</button>" + assign60Button(i) + "</div></div></div>")*/