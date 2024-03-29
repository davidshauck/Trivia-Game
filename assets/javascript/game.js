// creating global variables
let timer = 15;
let intervalID;
let questionNumber = 0;
let wins = 0;
let losses = 0;
let audio = document.getElementById("myAudio"); 
let fadeText;

// object containing the questions, possible answers and correct answer
let questions = [
    {
        question: "Which brackets enclose objects?",
        possibleAnswers: ["{ }", "[ ]", "( )", ":-)"],
        correctAnswer: "{ }"
    }, 
    {
        question: "Which brackets enclose arrays?",
        possibleAnswers: ["< >", "( )", "[ ]", "o-O"],
        correctAnswer: "[ ]"
    }, 
    {
        question: "Which word is often paired with 'if'?",
        possibleAnswers: ["then", "switch", "case", "else"],
        correctAnswer: "else"
    },
    {
        question: "Which word does not create a variable?",
        possibleAnswers: ["var", "make", "let", "const"],
        correctAnswer: "make"
    },
    {
        question: "What is a website's public endpoint?",
        possibleAnswers: ["API", "URL", "FBI", "KFC"],
        correctAnswer: "API"
    },
    {
        question: "Which of these is a Javascript function?",
        possibleAnswers: ["Comet", "409", "Ajax", "Soft Scrub"],
        correctAnswer: "Ajax"
    },
    {
        question: "Who is your favorite Bootcamp instructor?",
        possibleAnswers: ["Jim", "Dan", "Irving", "Justin"],
        correctAnswer: "ALL OF THE ABOVE!!!11!1!"
    }
];

// loading jquery
$(document).ready(function() {      

// function for if the player wants to go again
function playAgain () {
    // start music back at 0
    audio.currentTime = 0;
    // clear out all the variables, reset timer to 15 seconds
    timer = 15;
    intervalID;
    questionNumber = 0;
    wins = 0;
    losses = 0;
    // empty the quiz area div
    $("#quiz-area").empty();
    // run the questions function
    askingQuestions();
}

// click start to begin loading questions
$("#start").on("click", askingQuestions);

// function that loads new question
function askingQuestions() {
    playAudio();

    // reset timer to 15 seconds
    timer = 15;
    // populate div with new time text
    $(".absolute2").html("<p>Time remaining: 15 seconds");
    // populate quiz div with next question
    $("#quiz-area").html(questions[questionNumber].question + "<p>").css({
        marginTop: "0px",
        fontSize: "40px"
    });    
    // start timer, call countdown function
    intervalID = setInterval(countdown, 975);
    // answer button loop
    for (let i = 0; i < questions[questionNumber].possibleAnswers.length; i++) {
        //create answer burtton
        let answerButton = $('<button>');
        // add class for later styling
        answerButton.addClass('answer-button');  
        // add data attribute and to add ID's
        answerButton.attr('data-answer', questions[questionNumber].possibleAnswers[i]);
        answerButton.attr("id","answer-button");
        // add text to button
        answerButton.html(questions[questionNumber].possibleAnswers[i]);
        // populate div with animated fade
        $(answerButton).hide().appendTo("#quiz-area").fadeIn(1500);  
    }
    // user clicks an answer button
    $(".answer-button").click(function() {
        // create a new variable popuulated with the data from the selected button
        let chosenAnswer = $(this).attr("data-answer");
        // pause audio, reset to beginning of song
        pauseAudio();
        audio.currentTime = 0;
        // execute function that sees if the answer is correct
        checkWin(chosenAnswer);
    });
    
    //function that checks if answer is correct
    function checkWin(a) {
        // if answer is correct
        if (a === questions[questionNumber].correctAnswer) {
            // stop the timer
            clearInterval(intervalID);
            // clear the timer div
            $(".absolute2").html(" ");
            // display "Correct!" with animation
            fadeText = $("#quiz-area");
            fadeText.html("Correct!")
            .css({
                marginTop: "85px",
                fontSize: "80px",
            });
            $(fadeText).hide().appendTo("#quiz-area").slideDown(1500);
            // set the timer back to 15 seconds
            timer = 15;
            // increment question by 1
            questionNumber += 1;
            // increment wins by 1  
            wins += 1;
            // check to see if we've reached the end of the questions
            if (questionNumber === questions.length) {
                setTimeout(gameOver, 3000);
            }
            else { 
                setTimeout(askingQuestions, 3000);
            }
        }
        // if the answer was incorrect
        else {
            // stop the clock
            clearInterval(intervalID);
            // clear the timer div
            $(".absolute2").html(" ");
            // tell them they blew it with animation
            fadeText = $("#quiz-area");
            fadeText.html('Sorry! <p>The correct answer was: <p> "' + questions[questionNumber].correctAnswer +'"')
            .css({
                marginTop: "30px",
                fontSize: "60px"
            });
            $(fadeText).hide().appendTo("#quiz-area").slideDown(1500);
            // reset timer to 15 seconds
            timer = 15;
            // increment question by 1  
            questionNumber += 1;
            // increment losses by 1 
            losses += 1;
            // check to see if we've reached the end of the questions
            if (questionNumber === questions.length) {
                setTimeout(gameOver, 3000);
            }
            else {
            setTimeout(askingQuestions, 3000)
            }
        }
    }
}

// what to do when the game is over
function gameOver() {
    // play outro theme
    audio.currentTime = 26;
    playAudio();
    // stop the timer
    clearInterval(intervalID);
    // display the wins and losses with animation
    fadeText = $("#quiz-area");
    fadeText.html("Final results:" +
    "<p>CORRECT: " + wins +
    "  |  INCORRECT: " + losses + 
    "<br><button id='start'>AGAIN?</button></p>"
    ).css({
        marginTop: "20px",
        fontSize: "54px"
    });
    $(fadeText).hide().appendTo("#quiz-area").slideDown(1500);
    // see if they want to go again?
    $("#start").css("margin-top", "5%").on("click", playAgain);
    // clear timer div
    $(".absolute2").html(" ");
}

// timer function
function countdown() {
    // increment timer down by 1
    timer--;
    // html for timer
    $(".absolute2").html("<p>Time remaining: " + timer + " seconds");
    // execute function to see if we've run out of time
    checkTimer();
}

// function to see if player has run out of time
function checkTimer () {
    // if time has run out
    if (timer === 0) {
        // pause audio, reset to beginning of song
        pauseAudio();
        audio.currentTime = 0;
        // increment losses by 1
        losses += 1;
        // increment questions by 1
        questionNumber += 1;
        // run the function that tells them what the correct answer was
        timeUp();
    }
}

// what happens when timer runs out on a question
function timeUp() {
    // stop the timer
    clearInterval(intervalID);
    $(".absolute2").html(" ");
    // display the correct answer with animation
    fadeText = $("#quiz-area");
    fadeText.html('The correct answer was: <p> "' + questions[questionNumber-1].correctAnswer + '"')
    .css({
        marginTop: "55px",
        fontSize: "60px"
    });
    $(fadeText).hide().appendTo("#quiz-area").slideDown(1500);
    // check to see if we've hit the end of the game
    if (questionNumber === questions.length) {
      setTimeout(gameOver, 3000);
    }
    else {
      setTimeout(askingQuestions, 3000);
    }
}

// jeopardy theme functions
function playAudio() { 
    audio.play(); 
}

function pauseAudio() { 
    audio.pause(); 
} 

});