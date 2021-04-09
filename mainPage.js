
const username = localStorage.getItem('user');
const userTeam = localStorage.getItem('team')
const nameEl = document.getElementById("name")
// var bkgColor = document.body.style.backgroundColor
const teamColors = ["red, gold, black", "blue, gold, maroon", "White, Navy, Navy", "White, Black", "Red, Black", "Purple, White", "White, Navy", "Blue, Gold, Red", "White, #36454f, Orange", "Gold, Brown", "Red, Navy", "White, Blue", "Silver, White, Teal, Black", "Gold, Black", "White, Red, Black", "Red, White", "Royalblue, Gold", "Blue, Red, White"]
const teamLi = ["Adelaide", "Brisbane Lions", "Carlton", "Collingwood", "Essendon", "Fremantle", "Geelong", "Gold Coast", "Greater Western Sydney", "Hawthorn", "Melbourne", "North Melbourne", "Port Adelaide", "Richmond", "St Kilda", "Sydney", "West Coast", "Western Bulldogs"];
var statsDiv = document.querySelector("#stats");

var statsUrl = 'https://api.squiggle.com.au/?q=standings';

function printName() {
    nameEl.innerHTML = "Hello, " + username;
}
printName();

function setbkgColor(chosenTeam) {
    var team = teamLi.indexOf(chosenTeam);
    var colorGradient = teamColors[team];
    document.body.style.backgroundImage = "linear-gradient(" + colorGradient + ")";
/*     var days = document.getElementsByClassName('days');
    for (var i = 0; i < days.length; i++){
        days[i].style.backgroundColor = "white";
    }*/
}
setbkgColor(userTeam);

function teamStats(chosenTeam) { 
        fetch(statsUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                for (var i= 0; i<data.standings.length; i++){
                        if ( data.standings[i].name == chosenTeam){
                            var createHEl = document.createElement('h3'); 
                            createHEl.innerHTML=(chosenTeam);
                            statsDiv.append(createHEl);
                            var createPEl = document.createElement('p');        
                            createPEl.innerHTML = ("<br> Rank: "+data.standings[i].rank+"<br> Points: "+data.standings[i].pts
                            +"<br> Wins: "+data.standings[i].wins+"<br> Losses: "+data.standings[i].losses
                            +"<br> Goals: "+data.standings[i].goals_for+"<br> Behinds: "+data.standings[i].behinds_for
                            +"<br> Goals Against: "+data.standings[i].goals_against+"<br> Behinds Against: "
                            +data.standings[i].behinds_against);
                            statsDiv.append(createPEl);
                        }
                }    
            });
}

teamStats(userTeam);

