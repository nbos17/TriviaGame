var correct = 0;
var incorrect = 0;
var numOfQuestions = 0;
var timeouts = 0;
var selectedAnswer = false;

    var questions = [
     {  
        //number : 1,
        name : "Who was our second President?",
        guess : ["George Washington", "Thomas Jefferson", "John Adams", "Ben Franklin"],
        CorrectAnswer : 2,
        attempted : false,
        message : "John Adams",
        img : 'src = adams.jpg'
      },
      {
        //number : 2,
        name : "Who was head of Slytherin house?",
        guess : ["Dumbledore", "Snape", "Flitwick", "Voldemort"],
        CorrectAnswer : 1,
        attempted : false,
        message : "Snape"

      },
      {
        name : "Who was the QB of the 2017 Super Bowl winning team?",
        guess : ["Tom Brady", "Matt Ryan", "Russell Wilson", "Ben Roethlisberger"],
        CorrectAnswer : 0,
        attempted : false,
        message : "Tom Brady"
      }
    ];

  function pause() {
    setTimeout(timer, 1000 * 5);
    function timer() {
      console.log("time");
      selectQuestion(questions);
    }
  }

  function endgame() {
    $('#wins').show();
    $('#losing').show();
    $('#na').show();
    $('#start').show();

    $('.Answer').hide();
    $('.Question').hide();
    $('#timer').hide();

    $('#wins').text("Correct Answers: " + correct);
    $('#losing').text("Incorrect Answers: " + incorrect);
    $('#na').text("Not Answered: " + timeouts);

  }

  function selectQuestion(object) {
    if (numOfQuestions === 3) {
      endgame();
    }
    else {
      $('#start').hide();
      selectedAnswer = false;
      $('.Question').show();
      $('.Question').text(object[numOfQuestions].name);
      $('.display').remove();
      timer();
      if (numOfQuestions < object.length ) {
        for (i = 0; i < object[numOfQuestions].guess.length; i++) {
          var abc = $('<newDiv>');
          abc.addClass('answer');
          abc.val(i);
          abc.text(object[numOfQuestions].guess[i]);
          $('.Answer').append(abc);
        }
      }
    }
      $('.answer').on("click", function() {
      var userGuess = $(this).val();
      userGuess = parseInt(userGuess);
      console.log(userGuess);

      if (userGuess === object[numOfQuestions].CorrectAnswer) {
        //alert('Correct!');
        selectedAnswer = true;
        correct++;
        object[numOfQuestions].attempted = true;
        numOfQuestions++;
        generateImage(questions);
      }
      else {
        alert('Incorrect!');
        selectedAnswer = true;
        incorrect++;
        object[numOfQuestions].attempted = true;
        numOfQuestions++;
        generateImage(questions);
      }

    });
  }


  $('#start').click(function() {
    correct = 0;
    incorrect = 0;
    numOfQuestions = 0;
    timeouts = 0;
    selectedAnswer = false;
    $('.Answer').show();
    $('.Question').show();
    $('#timer').show();
    $('#wins').hide();
    $('#losing').hide();
    $('#na').hide();
    selectQuestion(questions);  
  });



function generateImage (object) {
  $('.answer').remove();
  $('.Question').hide();
  var winning = $('<newDiv>');
  winning.addClass('display');
  winning.text("The Correct Answer is " + object[numOfQuestions - 1].message + object[numOfQuestions - 1].img);
  $('.Answer').append(winning);
  pause();
}

function timer() {
  var t = 10;
  var countdowns = setInterval(countdown, 1000);
    function countdown() {
      if (t === 0) {
        timeouts++;
        clearInterval(countdowns);
        numOfQuestions++;
        generateImage(questions);
      }
      else {
        t--;
        $('#timer').text("Time Remaining: " + t + " Seconds");
        }
      if (selectedAnswer == true ) {
          clearInterval(countdowns);
      }
    }     
}