// Insert your code here!
var Application = (function(){
  var jokesCollection = [], $jokes, $jokeForm, $jokeFormQuestion, $jokeFormAnswer, $newJokeTemplate;

  var jokeSubmitHandler = function(event){
    event.preventDefault();

    var joke = {
      id: jokesCollection.length,
      question: $jokeFormQuestion.val(),
      answer: $jokeFormAnswer.val()
    };

    $jokeFormQuestion.val('');
    $jokeFormAnswer.val('');
    jokesCollection.push(joke);

    $.ajax({
      type: "POST",
      url: "/api/jokes",
      data: joke
    });

    $(document).trigger('new-joke', [joke]);
  };

  var newJokeHandler = function(joke){
    var jokeHtml = $newJokeTemplate(joke);
    $jokes.append(jokeHtml);
  };

  var newJokeEventHandler = function(event, joke){
    newJokeHandler(joke);
  };

  var deleteJokeHandler = function(event){
    var joke = $(this).parent('.joke');
    var jokeId = joke.data('joke-id');
    joke.remove();
    jokesCollection.splice(jokeId,1);
    $.ajax({
      type: "DELETE",
      url: "/api/jokes/" + jokeId,
    });
  };

  var initializeJokes = function(){
    $.get('/api/jokes',function(jokes){
      jokesCollection = jokesCollection.concat(jokes);
      jokesCollection.forEach(newJokeHandler)
    });
  };

  var init = function(){
    $jokes = $('.jokes');
    $jokeForm = $("#joke-form");
    $jokeFormQuestion = $(".joke-form-question");
    $jokeFormAnswer = $(".joke-form-answer");
    $newJokeTemplate = Handlebars.compile($('#newJokeTemplate').html());

    initializeJokes();

    $jokeForm.on('submit', jokeSubmitHandler);
    $(document).on('new-joke', newJokeEventHandler);
    $(document).on('click', '.delete', deleteJokeHandler);
  };

  $(document).ready(init);
})();