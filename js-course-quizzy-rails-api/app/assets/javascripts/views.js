(function() {
  var QuizView = function($el, quizzes) {
    this.element = $('<div>')
    this.quizzes = quizzes;
    var template = $('#quizzes-template').html();
    var uncompiledTemplate = _.template(template);
    var $html = $(uncompiledTemplate({quizzes: this.quizzes}));

    var _view = this;
    $html.children('.quiz').on('click', function() {
      var id = $(this).data("quiz-id");
      _view.element.remove();
      var questionsController = new Controllers.Questions($el, id);
      questionsController.showFirstQuestion();
    });

    $el.html($html);
  };

  window.Views = window.Views || {};
  window.Views.Quiz = QuizView;
})();

(function() {
  var ChoicesQuestionView = function($el, question, controller) {
    this.element = $('<div>');
    var template = $('#choices-question-template').html();
    var uncompiledTemplate = _.template(template);
    var $html = $(uncompiledTemplate({question: question}));

    var _view = this;
    $html.children('.link.submit-answer').on('click', function() {
      var answer = $(this).data("answer");
      _view.element.remove();
      controller.submitAnswer(question, answer);
    });

    $el.html($html);
  };

  window.Views = window.Views || {};
  window.Views.ChoicesQuestion = ChoicesQuestionView;
})();

(function() {
  var BlankQuestionView = function($el, question, controller) {
    this.element = $('<div>');
    var template = $('#blank-question-template').html();
    var uncompiledTemplate = _.template(template);
    var $html = $(uncompiledTemplate({question: question}));

    var _view = this;
    $html.children('.form.submit-answer').on('submit', function(event) {
      event.preventDefault();
      var answer = $(this).find('.answer.input').val();
      _view.element.remove();
      controller.submitAnswer(question, answer);
    });

    $el.html($html);
  };

  window.Views = window.Views || {};
  window.Views.BlankQuestion = BlankQuestionView;
})();

(function() {
  var QuestionResultView = function($el, result, controller) {
    this.element = $('<div>');
    var template = $('#question-result-template').html();
    var uncompiledTemplate = _.template(template);
    var $html = $(uncompiledTemplate({result: result}));
    $el.html($html);
  };

  window.Views = window.Views || {};
  window.Views.QuestionResult = QuestionResultView;
})();

(function() {
  var QuizResultView = function($el, correct, total, controller) {
    this.element = $('<div>');
    var template = $('#final-score-template').html();
    var uncompiledTemplate = _.template(template);
    var $html = $(uncompiledTemplate({correct: correct, total: total}));
    var _view = this;

    $html.children('.link.new-quiz').on('click', function() {
      _view.element.remove();
      var controller = new Controllers.Quiz($el);
      controller.showQuizzes();
    });

    $el.html($html);
  };

  window.Views = window.Views || {};
  window.Views.QuizResult = QuizResultView;
})();