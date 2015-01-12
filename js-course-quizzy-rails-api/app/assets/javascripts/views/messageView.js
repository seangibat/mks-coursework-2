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