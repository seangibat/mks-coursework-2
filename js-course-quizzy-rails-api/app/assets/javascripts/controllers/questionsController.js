(function() {
  var QuestionsController = function($el, quizId) {
    this.$el = $el;
    this.quizId = quizId;
  };

  QuestionsController.prototype.showFirstQuestion = function() {
    var _this = this;
    Models.Question.fetch(_this.quizId, function(questions) {
      _this.questions = questions;
      _this.place = 0;
      var question = _this.questions[0];
      if (!question) {
        new Views.Message(_this.$el, "No questions for this quiz.");
      }
      else if (question.type === "multiple" || question.type == null || question.type == "boolean"){
        question.choices = (question.type == 'boolean') ? ['true','false'] : question.choices.split(';');
        new Views.ChoicesQuestion(_this.$el, _this, question);
      }
      else
        new Views.BlankQuestion(_this.$el, _this, question);
    });
  };

  QuestionsController.prototype.showNextQuestion = function() {
    this.place++;
    var question = this.questions[this.place];
    if (this.place >= this.questions.length)
      this.showFinalScore();
    else if (question.type === "multiple" || question.type == null || question.type == "boolean"){
      question.choices = (question.type == 'boolean') ? ['true','false'] : question.choices.split(';');
      new Views.ChoicesQuestion(this.$el, this, question);
    }
    else
      new Views.BlankQuestion(this.$el, this, question);
  };

  QuestionsController.prototype.submitAnswer = function(question, answer) {
    var _this = this;
    question.submitAnswer(answer, function(data){
      var result = (data.correct) ? "CORRECT" : "WRONG";
      new Views.QuestionResult(_this.$el, _this, result);
      setTimeout(function(){
        _this.showNextQuestion();
      },1000);
    });
  };

  QuestionsController.prototype.submitScore = function(name, correct) {
    var _this = this;
    Models.Quiz.submitScore(this.quizId, correct*1000, name, function(data){

    });
  };

  QuestionsController.prototype.showFinalScore = function() {
    _this = this;
    Models.Quiz.getScores(this.quizId, function(scores){
      var right = _this.questions.reduce(function(prev, question){ 
        return (prev + ((question.correct) ? 1 : 0)); 
      },0);
      scores = scores.sort(function(a,b){ 
        if (a.score < b.score) return 1;
        if (a.score > b.score) return -1;
        return 0;
      });
      new Views.QuizResult(_this.$el, _this, right, _this.questions.length, scores);
    });

  };

  window.Controllers = window.Controllers || {};
  window.Controllers.Questions = QuestionsController;
})();