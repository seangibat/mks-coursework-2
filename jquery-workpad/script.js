$(function(){

  var randomPx = function () {
    return Math.floor(Math.random() * 800) + 'px';
  };

  var moveButton = function(){
    $(".jumping-bean").css("top", randomPx());
    $(".jumping-bean").css("right", randomPx());
    setTimeout(moveButton,1000);
  }

  $(document).on('click', '.jumping-bean', moveButton);

  moveButton();

});
