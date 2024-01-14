var timerEl = document.querySelector("#time");

// Start screen
var startButton = document.querySelector("#start");
var startScreenEl = document.querySelector("#start-screen");
// Questions screen
var questionsScreenEl = document.querySelector("#questions");
var questionTile = document.querySelector("#question-title");
var choicesEl = document.querySelector("#choices");
var feedbackEl = document.querySelector("#feedback");
// End screen
var endScreenEl = document.querySelector("#end-screen");
var initialsInput = document.querySelector("#initials");
var finalScoreEl = document.querySelector("#final-score");
var submitButton = document.querySelector("#submit");


console.log(startButton);

var timerOnDisplay = 75;
var questionIndex = 0;

// A start button that when clicked a timer starts and the first question appears.
startButton.addEventListener("click", function () {
    timerEl.textContent = 75;
    //Change to question screen
    startScreenEl.setAttribute("class", "hide");
    questionsScreenEl.setAttribute("class", "start");
    startTimer();
    showQuestion();

});

function showQuestion() {
    var currentQuestion = questions[questionIndex].question;
    questionTile.textContent = currentQuestion;
    var currentChoices = questions[questionIndex].choices;

    //create button for each choice
    for (var j = 0; j < currentChoices.length; j++) {
        var choiceButton = document.createElement("button");
        choiceButton.textContent = currentChoices[j];
        choicesEl.appendChild(choiceButton);
    };
};


function startTimer() {
    var timerInterval = setInterval(function () { 
      timerOnDisplay--;
      timerEl.textContent = timerOnDisplay;
        if (timerOnDisplay === 0) {
            clearInterval(timerInterval);
        }
    }, 1000);
};