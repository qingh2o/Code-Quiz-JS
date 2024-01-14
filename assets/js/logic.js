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
// Function to display a question
function startTimer() {
    var timerInterval = setInterval(function () {
        timerOnDisplay--;
        timerEl.textContent = timerOnDisplay;
        if (timerOnDisplay === 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
};

// Function to display a question
function showQuestion() {
    var currentQuestion = questions[questionIndex].question;
    questionTile.textContent = currentQuestion;
    choicesEl.innerHTML = "";

    //Questions contain buttons for each answer.
    var currentChoices = questions[questionIndex].choices;
    for (var i = 0; i < currentChoices.length; i++) {
        var choiceButton = document.createElement("button");
        choiceButton.textContent = currentChoices[i];
        choicesEl.appendChild(choiceButton);
    };
};

// When answer is clicked, the next question appears
choicesEl.addEventListener("click", function (event) {
    var userAnswer = event.target;

    //If the answer clicked was incorrect then subtract time from the clock
    if (userAnswer.textContent === questions[questionIndex].correctAnswer) {
        feedbackEl.setAttribute("class", "start");
        feedbackEl.textContent = "Correct!";
    } else {
        feedbackEl.setAttribute("class", "start");
        feedbackEl.textContent = "Incorrect!";
        timerOnDisplay -= 15;
    }
    // 
    questionIndex++;
    if (timerOnDisplay > 0 && questionIndex < questions.length) {
        showQuestion();
    } else {
        //Change to end screen
        endQuiz();
    }
});


