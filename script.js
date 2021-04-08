var selectEl = document.querySelector("#teamList")
var submitEl = document.querySelector("#submitButton");
var inputEl = document.querySelector("#userName");
var selectEl = document.querySelector("#teamList");
var localIndex=0; 
  
var requestUrl = 'https://api.squiggle.com.au/?q=teams';
    
fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
        for (var i = 0; i < data.teams.length; i++) {
              
            var createOption = document.createElement('option');      
                    
            createOption.textContent = data.teams[i].name;
            createOption.value = data.teams[i].name;
                            
            selectEl.appendChild(createOption);
               
            }
    });
 

submitEl.addEventListener("click", saveData);     

function saveData(event){
    event.preventDefault();
    var userData = {user:"", team:""};
    userData.user = inputEl.value;
    userData.team = selectEl.value;
    console.log(userData);
    var local = localStorage.setItem(localIndex, JSON.stringify(userData));
    window.location.href = 'mainPage.html'
}