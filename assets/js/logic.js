var timerEl = document.querySelector("#time");
var startButton = document.querySelector("#start");
var startScreenEl = document.querySelector("#start-screen");
var questionsScreenEl = document.querySelector("#questions");
var questionTitle = document.querySelector("#question-title");
var choicesEl = document.querySelector("#choices");
var feedbackEl = document.querySelector("#feedback");
var endScreenEl = document.querySelector("#end-screen");
var initialsInput = document.querySelector("#initials");
var finalScoreEl = document.querySelector("#final-score");
var submitButton = document.querySelector("#submit");

var timerOnDisplay = 75;
var questionIndex = 0;
var timerInterval; // Declare timerInterval globally

// A start button that when clicked a timer starts and the first question appears.
startButton.addEventListener("click", function () {
    timerEl.textContent = 75;
    //Change to question screen
    startScreenEl.setAttribute("class", "hide");
    questionsScreenEl.setAttribute("class", "start");
    questionsScreenEl.setAttribute("style", "text-align: left");
    startTimer();
    showQuestion();
});
//Function to display a question
function startTimer() {
    timerInterval = setInterval(function () {
        if (timerOnDisplay > 0) {
            timerOnDisplay--;
            timerEl.textContent = timerOnDisplay;
        }
        if (timerOnDisplay <= 0 || questionIndex === questions.length) {
            clearInterval(timerInterval);
            //Change to end screen
            endQuiz();
        }
    }, 1000);
};

// Function to display a question
function showQuestion() {
    var currentQuestion = questions[questionIndex].question;
    questionTitle.textContent = currentQuestion;
    // Clear previous buttons when next question come up
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
    feedbackEl.setAttribute("class", "feedback start");
    feedbackEl.setAttribute("style", "text-align: left");
    //If the answer clicked was incorrect then subtract time from the clock
    if (userAnswer.textContent === questions[questionIndex].correctAnswer) {
        feedbackEl.textContent = "Correct!";
    } else {
        feedbackEl.textContent = "Incorrect!";
        timerOnDisplay -= 15;
        // Ensure that timerOnDisplay does not go below 0
        if (timerOnDisplay < 0) {
            timerOnDisplay = 0;
            timerEl.textContent = timerOnDisplay;   
        }
    }
    questionIndex++;
    // The quiz should end when all questions are answered or the timer reaches 0. 
    if (timerOnDisplay > 0 && questionIndex < questions.length) {
        showQuestion();
    } else {
        //Change to end screen
        endQuiz();
    }
});

