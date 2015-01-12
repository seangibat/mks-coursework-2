_.templateSettings = {
  interpolate: /\{\{\=(.+?)\}\}/g,
  evaluate: /\{\{(.+?)\}\}/g
};

var API = (function(){
  var quizQuestions, place, right, quizId;

  var quizzesFn = function(cb){
    $.get('/quizzes',cb);
  };

  var questionsFn = function(id, cb){
    $.get('/quizzes/' + id + '/questions', function(data){
      quizQuestions = parseQuestions(data);
      place = 0;
      right = 0;
      quizId = id;
      cb(data);
    });
  };

  var quizFinalScoreFn = function(){
    return {
      correct: right,
      total: quizQuestions.length
    }
  };

  var submitAnswerFn = function(answer, cb){
    $.get('/quizzes/' + quizId + '/questions/' + quizQuestions[place].id + '/check?answer=' + answer, function(data){
      if (data.correct) right++;
      cb(data.correct);
    });
  };

  var nextQuestionFn = function(){
    place++;
    if (place >= quizQuestions.length)
      return false;
    return quizQuestions[place];
  };

  var createQuizFn = function(quiz, cb){
    $.post('/quizzes', quiz, cb);
  };

  var createQuestionFn = function(id, question, cb){
    $.post('/quizzes/' + id + '/questions', question, cb);
  };

  var parseQuestions = function(questions){
    questions.forEach(function(item){
      item.choices = item.choices.split(';');
    });
    return questions;
  };

  var updateQuizFn = function(quizId, obj, cb){
    $.ajax({
      method: 'PUT',
      data: obj,
      url: '/quizzes/' + quizId,
      success: cb
    });
  };

  var updateQuestionFn = function(quizId, questionId, obj, cb){
    $.ajax({
      method: 'PUT',
      data: obj,
      url: '/quizzes/' + quizId + '/questions/' + questionId,
      success: cb
    });
  };

  return {
    quizzes        : quizzesFn,
    questions      : questionsFn,
    createQuiz     : createQuizFn,
    updateQuiz     : updateQuizFn,
    submitAnswer   : submitAnswerFn,
    nextQuestion   : nextQuestionFn,
    updateQuestion : updateQuestionFn,
    quizFinalScore : quizFinalScoreFn,
    createQuestion : createQuestionFn,
  }

})();

var Display = (function(){
  var quizListingTemplate, choicesQuestionTemplate, $messageContainer, $quizListingsContainer, 
    $mainContainer, questionResultTemplate, finalScoreTemplate, newQuizTemplate, newQuestionTemplate,
    quizCreateSuccessTemplate, editQuizTemplate;

  var quizzesFn = function(quizzes){
    $quizListingsContainer.html(quizListingsTemplate({quizzes: quizzes}));
  };

  var choicesQuestionFn = function(question){
    $mainContainer.html(choicesQuestionTemplate({question: question}));
  };

  var blankQuestionFn = function(question){
    $mainContainer.html(blankQuestionTemplate({question: question}));
  };

  var finalScoreFn = function(score){
    $mainContainer.html(finalScoreTemplate({score: score}));
  };

  var questionResultFn = function(result){
    $mainContainer.html(questionResultTemplate({result: result}));
  };

  var newQuizFormFn = function(){
    $mainContainer.html(newQuizTemplate());
  };

  var editQuizFormFn = function(quiz, questions){
    $mainContainer.html(editQuizTemplate({quiz: quiz, questions: questions }));
  };

  var newQuestionFormFn = function(quiz){
    $mainContainer.html(newQuestionTemplate({quiz: quiz}));
  };

  var createQuizSuccessFn = function(quiz){
    $mainContainer.html(quizCreateSuccessTemplate({quiz: quiz}));
  };

  var messageFn = function(message){
    $messageContainer.text(message).fadeIn();
    setTimeout(function(){
      $messageContainer.fadeOut();
    },2000);
  };

  var initFn = function(){
    quizListingsTemplate = _.template($('#quiz-listings-template').html());
    choicesQuestionTemplate = _.template($('#choices-question-template').html());
    blankQuestionTemplate = _.template($('#blank-question-template').html());
    finalScoreTemplate = _.template($('#final-score-template').html());
    questionResultTemplate = _.template($('#question-result-template').html());
    newQuizTemplate = _.template($('#new-quiz-template').html());
    editQuizTemplate = _.template($('#edit-quiz-template').html());
    newQuestionTemplate = _.template($('#new-question-template').html());
    quizCreateSuccessTemplate = _.template($('#quiz-create-success-template').html());
    $quizListingsContainer = $('#quiz-listings-container');
    $mainContainer = $('#main-container');
    $messageContainer = $('#message-container');
  };

  return {
    init              : initFn,
    quizzes           : quizzesFn,
    message           : messageFn,
    finalScore        : finalScoreFn,
    newQuizForm       : newQuizFormFn,
    editQuizForm      : editQuizFormFn,
    blankQuestion     : blankQuestionFn,
    questionResult    : questionResultFn,
    choicesQuestion   : choicesQuestionFn,
    newQuestionForm   : newQuestionFormFn,
    createQuizSuccess : createQuizSuccessFn
  }
})();

var UI = (function(){
  var processAndDisplayQuestion = function(question){
    if (question) {
      console.log(question);
      if (question.question_type === "multiple" || question.question_type === null)
        Display.choicesQuestion(question);
      else if (question.question_type === "boolean") {
        question.choices = ["true", "false"];
        Display.choicesQuestion(question);
      }
      else if (question.question_type === "blank")
        Display.blankQuestion(question);
    }
    else
      Display.message("This quiz has no questions.");
  };

  var quizClickHandler = function(){
    var quizId = $(this).data('quiz-id');
    API.questions(quizId, function(questions){
      processAndDisplayQuestion(questions[0]);
    });
  };

  var submitAnswerClickHandler = function(){
    var answer = $(this).data('answer');
    API.submitAnswer(answer, function(result){
      result = (result) ? "CORRECT" : "WRONG, DEAD WRONG";
      Display.questionResult(result);
      setTimeout(function(){
        var nextQuestion = API.nextQuestion();
        if (nextQuestion)
          processAndDisplayQuestion(nextQuestion);
        else {
          Display.finalScore(API.quizFinalScore());
        }
      },1000);
    });
  };

  var submitBlankAnswerHandler = function(event){
    event.preventDefault();
    var answer = $(this).children('.answer').val();
    API.submitAnswer(answer, function(result){
      result = (result) ? "CORRECT" : "WRONG, DEAD WRONG";
      Display.questionResult(result);
      setTimeout(function(){
        var nextQuestion = API.nextQuestion();
        if (nextQuestion)
          processAndDisplayQuestion(nextQuestion);
        else {
          Display.finalScore(API.quizFinalScore());
        }
      },1000);
    });
  };

  var createQuizClickHandler = function(){
    Display.newQuizForm();
  };

  var editQuizClickHandler = function(event){
    event.stopPropagation();
    var quiz = $(this).data('quiz');
    API.questions(quiz.id, function(questions){
      Display.editQuizForm(quiz, questions);
    });
  };

  var createQuestionClickHandler = function(event){
    event.stopPropagation();
    var quiz = $(this).data('quiz');
    Display.newQuestionForm(quiz);
  };

  var typeChangeHandler = function(){
    console.log($(this));
    // var input = $(this).next().next('.choices');
    if ($(this).find("option:selected").val() === "multiple")
      $(this).next().next().show();
    else
      $(this).next().next().hide();
  };

  var newQuizSubmitHandler = function(event){
    event.preventDefault();

    var quiz = {};
    $(this).serializeArray().forEach(function(x){quiz[x.name] = x.value;});

    API.createQuiz(quiz, function(data){
      if (data.status === "created") {
        Display.createQuizSuccess(data.entity);
        quizListingsFn();
      }
    });
  };

  var editQuizSubmitHandler = function(event){
    var totalUpdatesReceived = 0;
    event.preventDefault();

    var afterQuestionSubmit = function(data){
      if (data.status = 200) {
        totalUpdatesReceived++;
        if (totalUpdatesReceived == questions.length) {
          Display.message("Quiz successfully updated!");
        }
      }
    };

    var result = {};
    $(this).serializeArray().forEach(function(x){result[x.name] = x.value;});

    var questions = $(this).data('questions');
    var quiz = $(this).data('quiz');

    console.log(questions);

    API.updateQuiz(quiz.id, {'quiz[title]':result['quiz[title]']}, function(ok){
      if (ok.status = 200){
        questions.forEach(function(question){
          var newQuestion = {
            'question[question]': result['q' + question.id + 'question'],
            'question[answer]': result['q' + question.id + 'answer'],
            'question[question_type]': result['q' + question.id + 'question_type'],
            'question[choices]': result['q' + question.id + 'choices']
          }
          API.updateQuestion(quiz.id, question.id, newQuestion, afterQuestionSubmit);
        });
      }
      else Display.message("Could not update quiz.");
    });
  };

  var newQuestionSubmitHandler = function(event){
    event.preventDefault();

    var question = {}, quiz = $(this).data('quiz'), message;
    $(this).serializeArray().forEach(function(x){question[x.name] = x.value;});

    API.createQuestion(quiz.id, question, function(data){
      if (data.status === "created") {
        Display.message("New question, id " + data.entity.id + " created successfully.");
        Display.newQuestionForm(quiz);
      }
    });
  };

  var quizListingsFn = function(){
    API.quizzes(Display.quizzes);
  };

  var registerHandlersFn = function(){
    $(document).on('click', '.quiz.link', quizClickHandler);
    $(document).on('click', '.submit-answer.link', submitAnswerClickHandler);
    $(document).on('submit', '.form.blank-question', submitBlankAnswerHandler);
    $(document).on('click', '.link.new-quiz', createQuizClickHandler);
    $(document).on('click', '.link.edit-quiz', editQuizClickHandler);
    $(document).on('click', '.link.new-question', createQuestionClickHandler);
    $(document).on('change', 'select.type', typeChangeHandler);
    $(document).on('submit', '.form.new-quiz', newQuizSubmitHandler);
    $(document).on('submit', '.form.edit-quiz', editQuizSubmitHandler);
    $(document).on('submit', '.form.new-question', newQuestionSubmitHandler);
  };

  return {
    quizListings     : quizListingsFn,
    registerHandlers : registerHandlersFn
  }
})();

$(document).ready(function(){
  Display.init();
  UI.registerHandlers();
  UI.quizListings();
});