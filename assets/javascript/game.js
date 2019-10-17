$(document).ready(function() {

let timer = 11;
let timerRunning = false;
let intervalID;
let questionNumber = 0;
let wins = 0;
let losses = 0;

let questions = [
    {
        question: "What is my name?",
        possibleAnswers: ["Dave", "Jim", "Irving", "Justin"],
        correctAnswer: "Dave"
    }, 
    {
        question: "What's my favorite color?",
        possibleAnswers: ["Plaid", "Clear", "Paisley", "Blue"],
        correctAnswer: "Plaid"
    }, 
    {
        question: "What's my dog's name",
        possibleAnswers: ["Dan", "Ruby", "Irving", "Jim"],
        correctAnswer: "Ruby"
    }
];

// $("#start").on("click", start); // this starts the timer **WORKS**

$("#start").on("click", askingQuestions)

function askingQuestions() {
    $("#start").html(" ");
    $("#quiz-area").html(questions[questionNumber].question);

    for (let i = 0; i < 4; i++) {

        // Inside the loop...
  
        // 2. Create a variable named "answerButton" equal to $("<button>");
          let answerButton = $('<button>');
  
        // 3. Then give each "answerButton" the following classes: "answer-button" "answer-text" "answer-button-color".
          answerButton.addClass('answer-button answer-text answer-button-color');
    
        
  
        // 4. Then give each "answerButton" an attribute called "data-answer", with a value eqaual to "questions[questionNumber].possibleAnswers[i]"
        //   answerButton.attr('data-answer', possibleAnswers.questionNumber);
        answerButton.attr('data-answer', questions[questionNumber].possibleAnswers[i]);
        // console.log($(this).attr("data-location"));

  
        // 5. Then give each "answerButton" a text equal to "letters[i]".
  
          answerButton.html(questions[questionNumber].possibleAnswers[i]);
          $('#quiz-area').append(answerButton);
          console.log(answerButton);
        //   $("#quiz-area").append(questions[questionNumber].possibleAnswers[i]);
  
        }

        $(".answer-button").click(function() {
            chosenAnswer = $(this).attr("data-answer");
            console.log(chosenAnswer);
            if (chosenAnswer === questions[questionNumber].correctAnswer) {
                $("#quiz-area").html("You win");
                questionNumber += 1;
                wins += 1;
                setTimeout(askingQuestions, 3000)
            }
            else {
                $("#quiz-area").html("You lose");
                questionNumber += 1;
                wins += 1;
                setTimeout(askingQuestions, 3000)
            }
           
        });



}














function countdown() {
    $("#quiz-area").html(questions.question);

    timer--;
    console.log(timer);
    $("#timer").text(timer);
   
    if (timer === 0) {
        clearInterval(timer);
        alert("You lose");
    }

  }

  function start() {

    // DONE: Use setInterval to start the count here and set the clock to running.
    if (!timerRunning) {
      intervalId = setInterval(countdown, 1000);
      timerRunning = true;
    }
  }

  
//   setInterval(count, 1000);

  

});