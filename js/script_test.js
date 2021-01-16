// This script gets data from GitHub
// This script directly outputs variables onto the screen


$.getJSON("https://covid-api.mmediagroup.fr/v1/cases", function(data){

    var ontario_data = data["Canada"]["Ontario"];

    var recover_rate = 100 * ontario_data["recovered"] / (ontario_data["recovered"] + ontario_data["deaths"]);
    recover_rate = Math.round(recover_rate * 100) / 100;
    
    document.getElementById("current_cases").innerHTML = ontario_data["confirmed"];
    document.getElementById("recovered").innerHTML = ontario_data["recovered"];
    document.getElementById("deaths").innerHTML = ontario_data["deaths"];

    document.getElementById("recovery_rate").innerHTML = recover_rate + "%";

    // Debug/Test
    console.log(ontario_data);

});