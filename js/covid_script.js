// This script gets data from GitHub
// This script directly outputs variables onto the screen

const base_url = "https://covid-api.mmediagroup.fr/v1/cases";

/* Steps this script does:

1: Gets input from HTML file
2: Get data from website
3: Use for loop to go thru data
4: Find and process data
5: Replaces the text in HTML file with output

*/

/* Old code, just skip this

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



// Returns a valid api parameter. If not possible, returns False
function convertToApiParameters(param){

    if (param == "continent" || param == "country"){
        return param.toLowerCase();
    }
    return false;

}

function replaceHTML(new_data){

    //console.log("Info at replaceHTML():");
    console.log(new_data);

    // 5: Replaces the text in HTML file with output
    var recover_rate = 100 * new_data["recovered"] / (new_data["recovered"] + new_data["deaths"]);
    recover_rate = Math.round(recover_rate * 100) / 100;
    
    //console.log(recover_rate);

    document.getElementById("current_cases").innerHTML = new_data["confirmed"];
    document.getElementById("recovered").innerHTML = new_data["recovered"];
    document.getElementById("deaths").innerHTML = new_data["deaths"];

    document.getElementById("recovery_rate").innerHTML = recover_rate + "%";

}

function populateLocation(category){
    
    //console.log("Function got called");
    console.log(category);

    //2: Get data from website
    let options;

    //3: Use for loop to go thru data

    // if continent, there is no ["All"]. A dictionary must be created first.
    if (category == "continent"){

        fetch(base_url + "?" + category + "=" + location).then(res => res.json()).then(data => {
            
            //console.log("data:");
            //console.log(data);

            // create a dict to store data
            new_data = {
                "confirmed" : 0,
                "recovered" : 0,
                "deaths" : 0
            }

            //console.log ("Initializing new_data!");
            //console.log(new_data);

            // loop over the json to get the informations
            $.each(data, function(country, all_info){

                /*
                console.log("Country");
                console.log(country)

                console.log("All_info");
                console.log(all_info);
                */
                new_data["confirmed"] += all_info["All"]["confirmed"];
                new_data["recovered"] += all_info["All"]["recovered"];
                new_data["deaths"] += all_info["All"]["deaths"];

            });

            //console.log("new_data");
            //console.log(new_data);
            replaceHTML(new_data);

        });

    }

    // directly pass JSON file thru if country (["All"] exists)
    else if (category == "country"){

        fetch(base_url).then(res => res.json()).then(all_data => {
            //console.log(all_data);
            options = Object.keys(all_data);
            //replaceHTML(new_data);
            //console.log(options);
        });

    }

    else {
        //Not implemented
    }

    var select = document.getElementById("location"); 

    
}

function getInfo(category, location){

    //console.log("Function got called");
    console.log(category);
    console.log(location);


    //2: Get data from website
    let new_data;

    //3: Use for loop to go thru data

    // if continent, there is no ["All"]. A dictionary must be created first.
    if (category == "continent"){

        fetch(base_url + "?" + category + "=" + location).then(res => res.json()).then(data => {
            
            //console.log("data:");
            //console.log(data);

            // create a dict to store data
            new_data = {
                "confirmed" : 0,
                "recovered" : 0,
                "deaths" : 0
            }

            //console.log ("Initializing new_data!");
            //console.log(new_data);

            // loop over the json to get the informations
            $.each(data, function(country, all_info){

                /*
                console.log("Country");
                console.log(country)

                console.log("All_info");
                console.log(all_info);
                */
                new_data["confirmed"] += all_info["All"]["confirmed"];
                new_data["recovered"] += all_info["All"]["recovered"];
                new_data["deaths"] += all_info["All"]["deaths"];

            });

            //console.log("new_data");
            //console.log(new_data);
            replaceHTML(new_data);

        });

    }

    // directly pass JSON file thru if country (["All"] exists)
    else if (category == "country"){

        fetch(base_url + "?" + category + "=" + location).then(res => res.json()).then(country_or_continent_data => {
            console.log(country_or_continent_data);
            new_data = country_or_continent_data.All;
            replaceHTML(new_data);
        });

    }

    // Category is a city/province/state, so we'll have to use a for loop to find it
    else{
        
        // checks if we found something in the for loop. if not, default to getting "Global" data
        var found_the_place = false;

        // Use a for loop to find it.
        $.getJSON(base_url, function(data){

            $.each(data, function(country, city_value_pairs){
                
                /*
                console.log("Outer loop");
                console.log(country);
                console.log(city_value_pairs);
                */

                $.each(city_value_pairs, function(city, city_data){

                    /*
                    console.log("Inner loop");
                    console.log(city);
                    console.log(city_data);
                    */

                    if (city == location){
                        
                        //console.log("found_the_place!")

                        found_the_place = true;
                        new_data = city_value_pairs[city];
                        replaceHTML(new_data);
                        // special way to break out of jQuery's loops
                        return false;
                    }
                });

                if (found_the_place){
                    // special way to break out of jQuery's loops
                    return false;
                }

            });

        });

        if (! found_the_place){
            new_data = data["Global"]["All"];
            replaceHTML(new_data);
        }

    }
    
}



// listen for submit button press. if presssed, doApiSearch()
document.getElementById("start").addEventListener("click", () => {
    //console.log("clicked");

    // 1: Gets input from HTML file
    const location = document.getElementById('location').value;
    let category = document.getElementById('category').value;

    //console.log(category);

    category = convertToApiParameters(category);

    // debug
    //console.log("location= " + location);
    //console.log("category= " + category);

    getInfo(category, location);

});

// listen for submit button press. if presssed, doApiSearch()
document.getElementById("category").addEventListener("change", () => {
    //console.log("clicked");

    // 1: Gets input from HTML file
    const location = document.getElementById('location').value;
    let category = document.getElementById('category').value;

    console.log(category);

    //category = convertToApiParameters(category);

    // debug
    //console.log("location= " + location);
    //console.log("category= " + category);

    populateLocation(category);

});
