var failNumber = 0;
var failMessage = "";

$(document).ready(function() {
    $('#submitbtn').on('click',( function(){
        var searchTerms= $("#searchfield").val().replace("'","");

        $.getJSON("http://www.carqueryapi.com/api/0.3/?callback=?", {cmd:"getTrims", keyword:searchTerms}).done(function(data) {
            $('#results').empty();

            var trims = data.Trims;
            if (trims.length == 0){
                $('#results').append("<div class='trimResult trim'>Sorry, that search returned no results. Please check your spelling, make sure you've included all the necessary terms, and try again.</div>");
            }

            for(i=0; i < trims.length; i++) {
                var returnedCCs = trims[i].model_engine_cc;
                var returnedEngine = trims[i].model_engine_type;
                var returnedCyl = trims[i].model_engine_cyl;
                var returnedTrim = trims[i].model_trim;
                var returnedTrans = trims[i].model_transmission_type;
                var returnedPS = trims[i].model_engine_power_ps;

                var engineResult = "";
                var engineType = "";
                var liters = "";

                if (returnedEngine !== "" && returnedEngine !== null){
                    if (returnedEngine == "V"){
                        engineType = returnedEngine + returnedCyl;
                    } else {
                        engineType = returnedEngine + " " + returnedCyl;
                    }
                    if (returnedCCs !== "" && returnedCCs !== null){
                        liters = (Math.round(trims[i].model_engine_cc / 100) / 10) + "L ";
                    }

                    engineResult = "<div class='engine'>Engine: " + liters + engineType + "</div>"
                }

                var trimResult = "";
                if (returnedTrim !== "" && returnedTrim !== null){
                    trimResult = "<div class='trim'>" + returnedTrim + "</div>";
                }

                var transmissionResult = "";
                if (returnedTrans !== "" && returnedTrans !== null){
                    transmissionResult = "<div class='transmission'>Transmission: " + returnedTrans + "</div>";
                }

                var powerResult = "";
                if (returnedPS !== "" && returnedPS !== null){
                    transmissionResult = "<div class='transmission'>Maximum horsepower: " + Math.round(returnedPS * 0.9863) + "hp</div>";
                }

                $('#results').append("<div class='trimResult'><div class='headline'>" + trims[i].model_year + " " + trims[i].make_display + " " + trims[i].model_name + "</div>" + trimResult + engineResult + transmissionResult + powerResult + "</div>")

            }
            failNumber = 0;
        }).fail(function(){
            $('#results').empty();
            switch (failNumber){
                case 0:
                    failMessage = "Sorry, something went wrong with your search. Please try again.";
                    break;
                case 1:
                    failMessage = "Perhaps the server is down. Try even later.";
                    break;
                case 2:
                    failMessage = "You are persistent! If at first you don't succeed...";
                    break;
                default:
                    failMessage = "The problem is even more persistent than you are, it seems. Please contact the site administrator for assistance.";
            }
            $('#results').append("<div class='trimResult trim'>" + failMessage + "</div>");
           failNumber ++;
        });
    }));
}); // end of doc ready