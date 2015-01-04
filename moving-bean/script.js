$(function(){

  var randomPx = function () {
    return Math.floor(Math.random() * 800) + 'px';
  };

  var moveButton = function(button){
    var times = $(button).data('times');
    $(button).css("top", randomPx());
    $(button).css("right", randomPx());
    setTimeout(function(){moveButton(button)},times*1030);
  };

  var clickButton = function(){
    var times = $(this).data('times');
    console.log(times);
    if (times != 1){
      $(this)
        .data('times',times-1)
        .css('width',times*20+"px")
        .css('height',times*20+"px")
        .css('font-size',times*1.3+"em")
      $(this).data('times',times-1);
    }
    else {
      this.remove();
    }
  }

  var generateButton = function(){
    var button = $('<button/>')
      .addClass('jumping-bean')
      .data('times',3)
      .text('CLICK ME');
    $('body').append(button);
    return button;
  };

  var generateButtons = function(num){
    while (num != 0){
      generateButton();
      num--;
    }
  };

  generateButtons(10);

  $(document).on('click', '.jumping-bean', clickButton);

  $('.jumping-bean').each(function(k,v){
    moveButton(v);
  });

  var totalTime = 0;

  var timerInterval = setInterval(function(){
    totalTime+=1;
    $('#timer').text(totalTime + " seconds");
    if ($('.jumping-bean').length == 0)
      clearInterval(timerInterval);
  },1000);

});
