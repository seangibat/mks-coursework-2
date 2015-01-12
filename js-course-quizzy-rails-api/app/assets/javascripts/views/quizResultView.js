(function() {
  var QuizResultView = function($container, controller, correct, total, scores) {
    this.element = $('<div>');
    var uncompiledTemplate = _.template($('#final-score-template').html());
    this.element.html(uncompiledTemplate({correct: correct, total: total, scores: scores}));

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