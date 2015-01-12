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

  Quiz.submitScore = function(quizId, score, name, cb){
    $.ajax({
      method: "POST",
      url: "/quizzes/" + quizId + "/scores",
      success: cb,
      data: {
        "score[score]" : score,
        "score[user]"  : name
      }},function(){});
  };

  Quiz.getScores = function(quizId, cb){
    $.ajax({
      method: "GET",
      url: "/quizzes/" + quizId + "/scores",
      success: cb, 
    },cb);
  };

  Quiz.prototype.save = function(cb) {
    // use this.id, this.title to make ajax request
  };

  window.Models = window.Models || {};
  window.Models.Quiz = Quiz;
})();