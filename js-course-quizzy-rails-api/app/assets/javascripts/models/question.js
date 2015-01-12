(function() {
  var Question = function(data) {
    this.id = data.id;
    this.question = data.question;
    this.answer = data.answer;
    this.type = data.question_type;
    this.quizId = data.quiz_id;
    this.choices = data.choices;
    this.correct = false;
  };

  Question.fetch = function(quizId, cb) {
    $.ajax({
      method: "GET",
      url: "/quizzes/" + quizId + "/questions",
      success: function(questions) {
        var questionObjs = questions.map(function(questionData) {
          return new Question(questionData);
        });
        if (cb) {
          cb(questionObjs);
        }
      }
    });
  };

  Question.prototype.submitAnswer = function(answer, cb) {
    _this = this;
    $.ajax({
      method: "GET",
      url: "/quizzes/" + _this.quizId + "/questions/" + _this.id + "/check?answer=" + answer,
      success: function(data){
        console.log(data);
        if (data.correct){
          _this.correct = true;
        }
        else {
          _this.correct = false;
        }
        cb(data);
      }
    });
  };

  Question.prototype.save = function(cb) {
    // use this.id, this.title to make ajax request
  };

  window.Models = window.Models || {};
  window.Models.Question = Question;
})();