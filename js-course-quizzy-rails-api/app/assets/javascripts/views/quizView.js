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