// This script gets data from GitHub
// This script directly outputs variables onto the screen


$.getJSON("https://covid-api.mmediagroup.fr/v1/cases", function(data){

    var country_data = data["Canada"]["Ontario"];

    var recover_rate = 100 * country_data["recovered"] / (country_data["recovered"] + country_data["deaths"]);
    recover_rate = Math.round(recover_rate * 100) / 100;
    
    document.getElementById("current_cases").innerHTML = country_data["confirmed"];
    document.getElementById("recovered").innerHTML = country_data["recovered"];
    document.getElementById("deaths").innerHTML = country_data["deaths"];

    document.getElementById("recovery_rate").innerHTML = recover_rate + "%";

    // Debug/Test
    console.log(country_data);

});