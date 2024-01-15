var highscoresOlEl = document.querySelector("#highscores");

// Retreives SavedScoreList from local stroage 
var savedScoreList = localStorage.getItem("SavedScoreList");
var highScoresList = JSON.parse(savedScoreList);

console.log(savedScoreList);
console.log(typeof (highScoresList));

console.log(highScoresList);

// Append list to html
if (highScoresList !== null) {
    for (var i = 0; i < highScoresList.length; i++) {
        var listEl = document.createElement("li");
        highscoresOlEl.appendChild(listEl);
        listEl.textContent = highScoresList[i].userInitials + " - " + highScoresList[i].userScore;
    }
};

