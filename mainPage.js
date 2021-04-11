const username = localStorage.getItem('user');
const userTeam = localStorage.getItem('team')
const nameEl = document.getElementById("name")
// var bkgColor = document.body.style.backgroundColor
const teamColors = ["red, gold, black", "blue, gold, maroon", "White, Navy, Navy", "White, Black", "Red, Black", "Purple, White", "White, Navy", "Blue, Gold, Red", "White, #36454f, Orange", "Gold, Brown", "Red, Navy", "White, Blue", "Silver, White, Teal, Black", "Gold, Black", "White, Red, Black", "Red, White", "Royalblue, Gold", "Blue, Red, White"]
const teamLi = ["Adelaide", "Brisbane Lions", "Carlton", "Collingwood", "Essendon", "Fremantle", "Geelong", "Gold Coast", "Greater Western Sydney", "Hawthorn", "Melbourne", "North Melbourne", "Port Adelaide", "Richmond", "St Kilda", "Sydney", "West Coast", "Western Bulldogs"]


function printName() {
    nameEl.innerHTML = "User: " + username
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
