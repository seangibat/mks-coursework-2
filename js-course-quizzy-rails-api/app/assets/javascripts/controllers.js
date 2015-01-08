(function() {
  var QuizController = function(parentElement) {
    this.parentElement = parentElement;
  };

  QuizController.prototype.showQuizzes = function() {
    var $el = $(this.parentElement);
    Models.Quiz.fetch(function(quizzes) {
      var quizView = new Views.Quiz($el, quizzes);
    });
  };

  window.Controllers = window.Controllers || {};
  window.Controllers.Quiz = QuizController;
})();