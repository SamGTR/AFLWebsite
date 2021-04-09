var selectEl = document.querySelector("#teamList")
var submitEl = document.querySelector("#submitButton");
var inputEl = document.querySelector("#userName");
var selectEl = document.querySelector("#teamList");
var requestUrl = 'https://api.squiggle.com.au/?q=teams';
    
fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        for (var i = 0; i < data.teams.length; i++) {            
            var createOption = document.createElement('option');                         
            createOption.textContent = data.teams[i].name;
            createOption.value = data.teams[i].name;               
            selectEl.appendChild(createOption);              
        }
    });
 
function saveData(event){
    event.preventDefault();
    localStorage.setItem("user", inputEl.value);
    localStorage.setItem("team", selectEl.value);
    window.location.href = 'mainPage.html'
}
submitEl.addEventListener("click", saveData);  