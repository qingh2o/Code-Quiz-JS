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
var timerInterval; 

////---------Start Screen----------
// A start button that when clicked a timer starts and the first question appears.
startButton.addEventListener("click", function () {
    timerEl.textContent = 75;
    //Change to question screen
    startScreenEl.setAttribute("class", "hide");
    questionsScreenEl.setAttribute("class", "start");
    questionsScreenEl.setAttribute("style", "text-align: left");
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
    showQuestion();
});

//---------Question Screen----------
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
        feedbackEl.textContent = "Question " + [questionIndex + 1] + ": Correct!";
    } else {
        feedbackEl.textContent = "Question " + [questionIndex + 1] + ": Incorrect!";
        timerOnDisplay -= 10;
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

//---------End Screen----------
// When the game ends, it should display their score and give the user the ability to save their initials and their score
function endQuiz() {
    finalScoreEl.textContent = timerOnDisplay;
    endScreenEl.setAttribute("class", "start");
    endScreenEl.setAttribute("style", "text-align: left");
    questionsScreenEl.setAttribute("class", "hide");
    
};

// Error prevention: User sees message before typing
initialsInput.addEventListener("click", function () {
    feedbackEl.textContent ="Please enter no more than 3 characters!" ;
})

var inputDisplay = "";
initialsInput.addEventListener("input", function () {  
    //Convert all keys to upper case
    initialsInput.value = initialsInput.value.toUpperCase();
    inputDisplay = initialsInput.value;
   
    // Set the maxlength attribute based on the HTML max attribute
    initialsInput.setAttribute("maxlength", initialsInput.getAttribute("max"));  
});

// Submit the user input and time/score
submitButton.addEventListener("click", savePlayer);

function savePlayer() {
    //Check the input is valid before submitting and save to localStorage
    if (!inputDisplay.trim()) {
        alert("Error: \nPlease enter your initials!");
        return;
    } else {
        //Save 'inputDisplay' for initials and 'timerOnDisplay' for the score
        localStorage.setItem("savedInitials", inputDisplay);
        localStorage.setItem("savedScore", timerOnDisplay);
        // Redirect to highscores.html
        window.location.href = "highscores.html";
    }
};

