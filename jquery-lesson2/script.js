$(function(){
  var avengers = ["Iron Man", "Thor", "Hulk", "Ant Man", "Wasp"];


  var dot = function(hero,x) {
    setTimeout(function(){
      addGuy(hero);
    }, x*1000);
  }

  var stepThrough = function(arr,callback){
  	$('body').append("<ul id='avengers'></ul>");
  	for (var x = 0; x < arr.length; x++){
      dot(arr[x],x);
  	}
  }

  var addGuy = function(guy){
    console.log(guy);
  	var idName = guy.toLowerCase().replace(" ","-");
  	var el = "<li id='" + idName + "'>" + guy + "</li>";
  	$('#avengers').append(el);
  }

  var removeGuys = function(){
  	$('#ant-man').add('#wasp').remove();
  	var capt = "<li id='captain-america'>Captain America</li>";
  	$('#avengers').append(capt);
  }

  var sorter = function(a,b) {
    return $(a).text() > $(b).text() ? 1 : -1;
  }

  stepThrough(avengers, function(){
    console.log('g');
    var children = $('#avengers').children();

    $('#avengers').html(children.sort(sorter)); 

    $('body').append('<p id="hey">Hey</p>');

    $('#hey').on('click',function(){
      $('#avengers').children().first().detach().appendTo('#avengers');
    });
  });



});