//This function will show the quiz box and the progress section once the start button has been clicked. 
function handleStartClick(){
	$('.js-start-button').on('click',function(event){
		console.log("handleStartClick() ran");
		$('.progress-section').show();
		$('.start-section').hide();
		$('.end-section').hide();
		$('.quiz-box').show();
		renderQuizBox(); 
	});
}

const questionsArray = [
  {
    question: "1. Who was the first cartoon character to get a star on the Hollywood Walk of Fame?",
    optionone: "Bugs Bunny",
    optiontwo: "Snow White",
    optionthree: "Mickey Mouse",
    optionfour: "Winnie the Pooh",
    correctAnswer: "Mickey Mouse"
  },
  {
    question: "2. What year did disneyland open?",
    optionone: "1950",
    optiontwo: "1955",
    optionthree: "1959",
    optionfour: "1960",
    correctAnswer: "1955"
  },
  {
    question: "3. What does Hakuna Matata mean?",
    optionone: "Hello",
    optiontwo: "Goodbye",
    optionthree: "No worries",
    optionfour: "Be carefree",
    correctAnswer: "No worries"
  },
  {
    question: "4. What was the first Pixar movie?",
    optionone: "Toy Story",
    optiontwo: "Cars",
    optionthree: "Inside Out",
    optionfour: "Finding Nemo",
    correctAnswer: "Toy Story"
  },
  {
    question: "5.Who is Miguel's idol in Coco?",
    optionone: "Mama Coco",
    optiontwo: "Frida Kahlo",
    optionthree: "Ernesto de la Cruz",
    optionfour: "Hector",
    correctAnswer: "Ernesto de la Cruz"
  },
  ];

  let questionsCount = questionsArray.length;
  let questionCounter = 0;
  let score = 0; 
  
 
  
  //The functions below will render the following :
 
function renderQuizBox(){
  renderQuestionCount();
  renderQuestion();
  renderScore();
}

 //render the quiz box with the score. 
function renderScore(){
  $(".progress-section .score-card").text(`${score}/${questionsCount}`);
}

//render the current question number. 
function renderQuestionCount(){
  $(".progress-section .question-count").text(`Question ${questionCounter+1} of ${questionsCount}`);
}

//render a new question and its options. 
function renderQuestion(){
  $(".questions-form p").text(questionsArray[questionCounter].question);
  $(".questions-form #option-one").val(questionsArray[questionCounter].optionone);
  $(".questions-form #option-two").val(questionsArray[questionCounter].optiontwo);
  $(".questions-form #option-three").val(questionsArray[questionCounter].optionthree);
  $(".questions-form #option-four").val(questionsArray[questionCounter].optionfour);
   
  $(".questions-form #option-one").next().text(questionsArray[questionCounter].optionone);
  $(".questions-form #option-two").next().text(questionsArray[questionCounter].optiontwo);
  $(".questions-form #option-three").next().text(questionsArray[questionCounter].optionthree);
  $(".questions-form #option-four").next().text(questionsArray[questionCounter].optionfour);
}

// render and insert them into the DOM.
function handleSubmitAnswer(){
  $('.js-submit-button').on('click',function(event){
    console.log("handleSubmitAnswer() ran");
    let selectedOption = $('input[type=radio]:checked').val();
    if(selectedOption === undefined) {
       displayPopup(false, selectedOption);
    }
    else{
     //reset radio button
      $('input[type=radio]:checked').attr('checked',false);
      checkAnswer(selectedOption);
    }
 });
}

  // The function will check the answer selected by the user. It checks if it's correct or not correct. 
  function checkAnswer(selected){
    let rightAnswer = questionsArray[questionCounter].correctAnswer;
    if(selected === rightAnswer){
      score++;
      displayPopup(true, rightAnswer);
    } 
    else{
     displayPopup(false, rightAnswer);
    }
  }


// The function below displays popups to let the user know wether the answer is correct or incorrect. It will also display a prompt if the user forgets to select an option.
function displayPopup(status, answer){
  const correctAnswerIcon = "https://media.giphy.com/media/rkyY1h4MZxKM3wlEN8/giphy.gif";
  const wrongAnswerIcon= "https://media.giphy.com/media/jTemXLGfONHenS1icE/giphy.gif";
  const warningIcon = "https://media.giphy.com/media/MF0QiCa9JPEI6HiaCK/giphy.gif";
  $('.feedback-section').show();
  if(status){
    $(".popup-box img").attr("src",correctAnswerIcon);
    $(".popup-box #popup-text").text("Correct");
    $(".popup-box").show();
  }
  else{
      if(answer === undefined) {
         questionCounter--;
         $(".popup-box img").attr("src",warningIcon);
         $(".popup-box #popup-text").text('Please make a choice.');
       }
      else{
         $(".popup-box img").attr("src",wrongAnswerIcon);
        $(".popup-box #popup-text").text(`Incorrect, the correct answer is: ${answer}`);
      }
    }
     $(".popup-box").show();
}

 //This function either proceeds to the next question or displays the final score based on the question count. Made changes to the function names
 function handlePopupClose(){
  $('.js-close-button').on('click', function(event){
    console.log("handlePopupClose() ran");
    $('.popup-box').hide();
    $('.feedback-section').hide();
    $('.quiz-box').hide().show();
    questionCounter++;
    if(questionCounter < questionsArray.length) {
       $('.quiz-box').show();
       renderQuizBox();
    }
    else{
      $('.quiz-box').hide();
      displayFinalScore();
    }
  });
}  
  
  
  //This function displays the final score once the quiz is completed.
  function displayFinalScore(){
    $('.end-section').show(); /*fadeIn()*/
    $('.end-section h2').text(`Score: ${score}/${questionsCount}`);
    $('.correct .count' ).text(score);
    $('.wrong .count').text(questionsCount - score);
    resetQuiz();
 }
 
 //This function resets the questions and score.
 function resetQuiz(){
   questionCounter = 0;
   score = 0;
 }
 
 //This function starts the quiz over.
 function handleStartOver(){
   $('.js-startover-button').on('click', event => {
     console.log("handleStartOver() ran");
     $('.end-section').hide();
     $('.quiz-box').show();
     renderQuizBox();
   }); 
 }
 
 function init(){
  $('.end-section').hide();
  $('.progress-section').hide();
  $('.quiz-box').hide();
  $('.feedback-section').hide();
    handleStartClick();
    handleSubmitAnswer();
    handlePopupClose();
    handleStartOver()
 }
 $(init());