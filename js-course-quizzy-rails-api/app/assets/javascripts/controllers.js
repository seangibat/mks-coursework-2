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
        console.log('hi')
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
    console.log(_this);
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
    var right = this.questions.reduce(function(prev, question){ 
      console.log(prev, question.correct); 
      return (prev + ((question.correct) ? 1 : 0)); 
    },0);

    new Views.QuizResult(this.$el, this, right, this.questions.length);
  };

  window.Controllers = window.Controllers || {};
  window.Controllers.Questions = QuestionsController;
})();