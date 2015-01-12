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