// This script gets data from GitHub
// This script directly outputs variables onto the screen

var base_url = "https://covid-api.mmediagroup.fr/v1/cases";

var country;
var continent;

function createParameters(){

    var parameters;

    

}

function getInfo(){

    $.getJSON(base_url + createParameters(), function(data){
        
        // rounded to 2 demical places
        var recover_rate = 100 * data["recovered"] / (data["recovered"] + data["deaths"]);
        recover_rate = Math.round(recover_rate * 100) / 100;
        
        document.getElementById("current_cases").innerHTML = data["confirmed"];
        document.getElementById("recovered").innerHTML = data["recovered"];
        document.getElementById("deaths").innerHTML = data["deaths"];
    
        document.getElementById("recovery_rate").innerHTML = recover_rate + "%";
    
        // Debug/Test
        console.log(data);
    
    });

}

var button = select('#submit');
country = select('#country');
continent = select('#continent');

button.mousePressed(getInfo());