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