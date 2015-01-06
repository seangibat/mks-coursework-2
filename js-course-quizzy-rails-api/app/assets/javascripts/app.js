_.templateSettings = {
    interpolate: /\{\{\=(.+?)\}\}/g,
    evaluate: /\{\{(.+?)\}\}/g
};

var API = (function(){
  var quizQuestions, place, right, quizId;

  var quizzesFn = function(cb){
    $.get('/quizzes',cb);
  };

  var questionsFn = function(quizId, cb){
    $.get('/quizzes/' + id + '/questions', function(data){
      quizQuestions = data;
      place = 0;
      right = 0;
      quizId = id;
      cb(data);
    });
  };

  var submitAnswerFn = function(cb){
    $.get('/quizzes/' + quizId + '/questions/' + place + '/check?answer=your_answer_here')
  };

  var nextQuestionFn = function(){
    place++;
    if (place >= quizQuestions.length)
      return false;
    else
      return quizQuestions[place];
  };

  return {
    quizzes      : quizzesFn,
    questions    : questionsFn,
    submitAnswer : submitAnswerFn,
    nextQuestion : nextQuestionFn
  }

})();

var Display = (function(){
  var quizListingTemplate, questionTemplate, $quizListingsContainer, $questionContainer;

  var quizzesFn = function(quizzes){
    $quizListingsContainer.html(quizListingsTemplate({quizzes: quizzes}));
  };

  var questionFn = function(question){
    $questionContainer.html(questionTemplate({question: question}));
  };

  var scoreFn = function(){

  };

  var initFn = function(){
    _.template
    quizListingsTemplate = _.template($('#quiz-listings-template').html());
    questionTemplate = _.template($('#question-template').html());
    $quizListingsContainer = $('#quiz-listings-container');
    $questionsContainer = $('#questions-container');
  };

  return {
    init     : initFn,
    quizzes  : quizzesFn,
    question : questionFn,
    score    : scoreFn
  }
})();

var UI = (function(){
  var quizClickHandler = function(){
    var quizId = $(this).data('quiz-id');
    API.questions(quizId, function(question){
      Display.question(question);
    });
  };

  var nextQuestionClickHandler = function(){
    API.nextQuestion
  };

  var submitAnswerHandler = function(){

  };

  var initFn = function(){
    $(document).on('click', '.quiz.link', quizClickHandler);
    $(document).on('click', '.submit-answer.link', submitAnswerHandler);

    API.quizzes(function(quizzes){
      Display.quizzes(quizzes);
    });
  };

  return {
    init : initFn
  }
})();

$(document).ready(UI.init);