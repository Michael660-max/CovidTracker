// This script gets data from GitHub
// This script directly outputs variables onto the screen

var base_url = "https://covid-api.mmediagroup.fr/v1/cases";

var location;
var category;
/*
// changes user inputs from "" to whatever their values are supposed to be
function processEmptyData(){
    if (country_or_continent == ""){
        country_or_continent = "Global";
    }
    if (city_or_state_or_province == ""){
        city_or_state_or_province = "All";
    }
}

// Checks if user gave valid input
// returns: the new array of country/continent after successful index. If unsuccessful, returns "Global" data
function isCountryOrContinent(){

    // check if country
    $.getJSON(base_url + "?country=" + country_or_continent, function(country_data){
        if (data.length != 0){
            return country_data;
        }
    });

    // check if continent
    $.getJSON(base_url + "?continent=" + country_or_continent, function(continent_data){
        if (data.length != 0){
            return continent_data;
        }
    });

    $.getJSON(base_url, function(global_data){
        return global_data;
    });

}

// Checks if user gave valid input
// returns: covid data of city/state/province if successful. Otherwise: returns "All" data
function isCityOrStateOrProvince(data){
    if (data[city_or_state_or_province].length != 0){
        return data[city_or_state_or_province];
    }
    return data["All"];
}

function getInfo(){

    // try to get data
    processEmptyData();

    console.log("Data retrieved:");
    console.log(data);
    console.log();

    new_data = isCountryOrContinent();
    console.log("Data after isCountryOrContinent()")
    console.log(new_data);
    console.log();

    new_data = isCityOrStateOrProvince(new_data);
    console.log("Data after isCityOrStateOrProvince()")
    console.log(new_data);
    console.log();
    
    // rounded to 2 demical places
    var recover_rate = 100 * new_data["recovered"] / (new_data["recovered"] + new_data["deaths"]);
    recover_rate = Math.round(recover_rate * 100) / 100;
    
    document.getElementById("current_cases").innerHTML = new_data["confirmed"];
    document.getElementById("recovered").innerHTML = new_data["recovered"];
    document.getElementById("deaths").innerHTML = new_data["deaths"];

    document.getElementById("recovery_rate").innerHTML = recover_rate + "%";

}
*/
// listen for submit button press. if presssed, doApiSearch()
document.getElementById("Find").addEventListener("click", doApiSearch());

// does an api search when button gets pressed
function doApiSearch(){

    location = document.getElementById('#location');
    category = document.getElementById('#category');

    console.log("location= " + location);
    console.log("category= " + category);

    //getInfo(); 

}