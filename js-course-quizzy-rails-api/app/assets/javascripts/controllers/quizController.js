(function() {
  var QuizController = function($container) {
    this.$container = $container;
  };

  QuizController.prototype.showQuizzes = function() {
    var _this = this;
    Models.Quiz.fetch(function(quizzes) {
      var quizView = new Views.Quiz(_this.$container, quizzes);
    });
  };

  window.Controllers = window.Controllers || {};
  window.Controllers.Quiz = QuizController;
})();