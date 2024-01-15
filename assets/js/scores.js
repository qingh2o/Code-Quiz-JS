var highscoresOlEl = document.querySelector("#highscores");
var clearButton = document.querySelector("#clear");

// Retreives SavedScoreList from local stroage 
var savedScoreList = localStorage.getItem("SavedScoreList");
var highScoresList = JSON.parse(savedScoreList);

//Add list to HTML
if (highScoresList !== null) {

    // Sort the highScoresList array in descending order based on the userScore property
    highScoresList.sort(function (a, b) {
        return b.userScore - a.userScore;
    });
    //Append list to html
    for (var i = 0; i < highScoresList.length; i++) {
        var listEl = document.createElement("li");
        listEl.textContent = highScoresList[i].userInitials + " - " + highScoresList[i].userScore;
        highscoresOlEl.appendChild(listEl);
    }
};

// Clear highscores
clearButton.addEventListener("click", function () {

    //Remove all child elements from highscoresOlEl
    while (highscoresOlEl.firstChild) {
        highscoresOlEl.removeChild(highscoresOlEl.firstChild);
    }

    //Remove the SavedScoreList from local storage
    localStorage.removeItem("SavedScoreList");

});