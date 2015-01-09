(function() {
  var QuizView = function($container, quizzes) {
    this.element = $('<div>')
    var uncompiledTemplate = _.template($('#quizzes-template').html());
    this.element.html($(uncompiledTemplate({quizzes: quizzes})));

    var _view = this;
    this.element.find('.quiz').on('click', function() {
      var id = $(this).data("quiz-id");
      _view.element.remove();
      var questionsController = new Controllers.Questions($container, id);
      questionsController.showFirstQuestion();
    });

    $container.html(this.element);
  };

  window.Views = window.Views || {};
  window.Views.Quiz = QuizView;
})();

(function() {
  var ChoicesQuestionView = function($container, controller, question) {
    this.element = $('<div>');
    var uncompiledTemplate = _.template($('#choices-question-template').html());
    this.element.html(uncompiledTemplate({question: question}));
    
    var _view = this;
    this.element.find('.link.submit-answer').on('click', function() {
      var answer = $(this).data("answer");
      _view.element.remove();
      controller.submitAnswer(question, answer);
    });

    $container.html(this.element);
  };

  window.Views = window.Views || {};
  window.Views.ChoicesQuestion = ChoicesQuestionView;
})();

(function() {
  var BlankQuestionView = function($container, controller, question) {
    this.element = $('<div>');
    var uncompiledTemplate = _.template($('#blank-question-template').html());
    this.element.html(uncompiledTemplate({question: question}));

    var _view = this;
    this.element.find('.form.blank-question').on('submit', function(event) {
      event.preventDefault();
      var answer = $(this).find('.answer.input').val();
      _view.element.remove();
      controller.submitAnswer(question, answer);
    });

    $container.html(this.element);
  };

  window.Views = window.Views || {};
  window.Views.BlankQuestion = BlankQuestionView;
})();

(function() {
  var QuestionResultView = function($container, controller, result) {
    this.element = $('<div>');
    var uncompiledTemplate = _.template($('#question-result-template').html());
    this.element.html(uncompiledTemplate({result: result}));
    $container.html(this.element);
  };

  window.Views = window.Views || {};
  window.Views.QuestionResult = QuestionResultView;
})();

(function() {
  var QuizResultView = function($container, controller, correct, total) {
    this.element = $('<div>');
    var uncompiledTemplate = _.template($('#final-score-template').html());
    this.element.html(uncompiledTemplate({correct: correct, total: total}));

    var _view = this;
    this.element.find('.link.new-quiz').on('click', function() {
      _view.element.remove();
      var controller = new Controllers.Quiz($container);
      controller.showQuizzes();
    });
    this.element.find('.submit-score').on('submit', function(event) {
      event.preventDefault();
      var name = $('#score-name').val();
      $(this).remove();
      _view.element.append("<br>Score submitted!");
      controller.submitScore(name, correct);
    });

    $container.html(this.element);
  };

  window.Views = window.Views || {};
  window.Views.QuizResult = QuizResultView;
})();

(function() {
  var MessageView = function($container, message) {
    this.element = $('<div>');
    var uncompiledTemplate = _.template($('#message-template').html());
    this.element.html(uncompiledTemplate({message: message}));

    var _view = this;
    this.element.find('.link.new-quiz').on('click', function() {
      _view.element.remove();
      var controller = new Controllers.Quiz($container);
      controller.showQuizzes();
    });

    $container.html(this.element);
  };

  window.Views = window.Views || {};
  window.Views.Message = MessageView;
})();