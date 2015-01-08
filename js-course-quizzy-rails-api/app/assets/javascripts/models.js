(function() {
  var Quiz = function(data) {
    this.title = data.title;
    this.id = data.id;
  };

  Quiz.fetch = function(cb) {
    $.ajax({
      method: "GET",
      url: "/quizzes",
      success: function(quizzes) {
        var quizObjs = quizzes.map(function(quizData) {
          return new Quiz(quizData);
        });
        if (cb) {
          cb(quizObjs);
        }
      }
    });
  };

  Quiz.prototype.save = function(cb) {
    // use this.id, this.title to make ajax request
  };

  window.Models = window.Models || {};
  window.Models.Quiz = Quiz;
})();.js