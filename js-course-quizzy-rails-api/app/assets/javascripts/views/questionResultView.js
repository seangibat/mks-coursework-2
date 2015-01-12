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