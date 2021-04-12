
const username = localStorage.getItem('user');
const userTeam = localStorage.getItem('team')
const nameEl = document.getElementById("name")
const teamColors = ["red, gold, black", "blue, gold, maroon", "White, Navy, Navy", "White, Black", "Red, Black", "White, Purple", "White, Navy", "Blue, Gold, Red", "White, #36454f, Orange", "Gold, Brown", "Red, Navy", "White, Blue", "Black, Silver, White, Teal", "Gold, Black", "White, Red, Black", "White, Red", "Royalblue, Gold", "Blue, Red, White"]
const teamLi = ["Adelaide", "Brisbane Lions", "Carlton", "Collingwood", "Essendon", "Fremantle", "Geelong", "Gold Coast", "Greater Western Sydney", "Hawthorn", "Melbourne", "North Melbourne", "Port Adelaide", "Richmond", "St Kilda", "Sydney", "West Coast", "Western Bulldogs"]


function printName() {
    nameEl.innerHTML = "Hello, " + username.charAt(0).toUpperCase() + username.slice(1);
}
printName();

function setbkgColor(chosenTeam) {
    var team = teamLi.indexOf(chosenTeam);
    var colorGradient = teamColors[team];
    document.body.style.backgroundImage = "linear-gradient(" + colorGradient + ")";
    document.querySelector("header").style.color= colorGradient.split(",")[1];
    document.querySelectorAll("a").forEach(function(item){
          item.style.color= colorGradient.split(",")[1];
    })
    
    
}
setbkgColor(userTeam);


var gamesDays = 0;
var dateOfMatch;
var matchDates = [];
var matchInfo = {};

function getGames () {
  var apiUrl = 'https://api.squiggle.com.au/?q=games;year=2021;source=1;complete=0';

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) { 
          response.json().then(function (data) {
         // console.log(data);
            
           var l;
            for(var i=0; i<20 ; i++){
                  dateOfMatch =  data.games[i].date.substring(0, 10);
                  if(! (matchDates.includes(dateOfMatch))){
                      matchDates.push(dateOfMatch);
                      matchInfo[dateOfMatch] = [i];
                  }
                  else{
                      matchInfo[dateOfMatch].push(i);
                  }
            }
            for (var j = 0; j< (matchDates.length-1); j++){
                for(var k= j+1 ; k< matchDates.length; k++){
                    if(moment(matchDates[k]).isBefore(matchDates[j])){
                        l = matchDates[k];
                        matchDates[k] = matchDates[j];
                        matchDates[j] = l;
                    }
                }
            }
            var m1 = '<div id="myModal';
            var m2 = '"class="modal"><div class="modal-content"><div class="modal-header"><span class="close">×</span><h2>'
            var m3= '</h2></div><div class="modal-body"><p>'
            var m4 = '</p></div></div></div>';
           
            
        //    document.getElementById("p2").style.color = "blue";
            // fetch first five days to display
            for(var i= 0; i< 5; i++){
                document.querySelector("#day"+(i+1)).innerHTML = matchDates[i]+"<br>"+moment(matchDates[i]).format("dddd");
                document.querySelector("#tickets").children[i+1].children[0].setAttribute('href','https://www.ticketmaster.com.au/browse/afl-catid-711/sports-rid-10004?datestart='+matchDates[i]);
                var matchesEl = document.querySelector("#matches").children[i+1];
                var teamEl;
                matchInfo[matchDates[i]].forEach(function(item,index){
                    var modalFinal = m1+i+index+m2+ data.games[item].ateam+" V/S "+data.games[item].hteam+m3+"Venue: "+data.games[item].venue+"<br><br>Match Time: "+data.games[item].localtime+m4; 
                    teamEl = document.createElement("p");
                    teamEl.innerHTML = '<button class="myBtn"  background-color: transparent id="'+i+index+'">'+data.games[item].ateam+"<br> V/S <br>"+data.games[item].hteam+'</button>'+modalFinal+'<br><br>' ;
                    matchesEl.append(teamEl);
                })
            }
      //      document.querySelectorAll(".modal-header").style.color = "black";
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to fetch data');
    });
};

getGames();


function modalFuntion(event){
  event.preventDefault();
  var modalSelectedEl = event.target;
 
  if(modalSelectedEl.matches("button") && modalSelectedEl.classList.contains("myBtn"))
  {  
    var modalEl = document.getElementById("myModal"+modalSelectedEl.id);
    var teamColor = teamColors[teamLi.indexOf(userTeam)];
    teamColor = teamColor.split(",");
    modalEl.children[0].children[0].style.color = teamColor[0] ;
    modalEl.children[0].children[0].style.backgroundColor = teamColor[1] ;
    modalEl.style.display = "block";
  }
  else if(modalSelectedEl.matches("span") && modalSelectedEl.classList.contains("close"))
  { 
      modalSelectedEl.parentElement.parentElement.parentElement.style.display = "none";
  }
}

document.querySelector("#matches").addEventListener("click", modalFuntion);

var statsDiv = document.querySelector("#stats");
var statsUrl = 'https://api.squiggle.com.au/?q=standings';

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


