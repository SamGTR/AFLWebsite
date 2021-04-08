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
          console.log(data);
            
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

            // fetch first five days to display
            for(var i= 0; i< 5; i++){
                document.querySelector("#day"+(i+1)).innerHTML = matchDates[i];
                document.querySelector("#tickets").children[i+1].children[0].setAttribute('href','https://www.ticketmaster.com.au/browse/afl-catid-711/sports-rid-10004?datestart='+matchDates[i]);
                var matchesEl = document.querySelector("#matches").children[i+1];
                var teamEl;
                matchInfo[matchDates[i]].forEach(function(item){
                    teamEl = document.createElement("p");
                    teamEl.innerHTML = data.games[item].ateam+"<br> V/S <br>"+data.games[item].hteam+"<br><br>";
                    matchesEl.append(teamEl);
                })
            }
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

  