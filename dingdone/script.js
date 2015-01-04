// Intro to basic constructor functions
function Bell(soundUrl, imageUrl) {
  var me = this;

  this.constructor = function(){
    me.sound = new Howl({
      urls: [soundUrl]
    });

    me.fuse = $('<div/>').addClass('fuse').css('height','10px');
    me.view = $('<div/>').append($('<img/>').attr('src',imageUrl));
    me.view.append(me.fuse);

    me.view.on('click',function(){
      me.ring();
    });

    $('body').append(me.view);

    bells.push(me);
  };

  this.ring = function(callback) {
		me.sound.play();
		if (callback) {
			callback();
		}
	};

  this.delayedRing = function(callback){
    var countdown = Math.random() * 5000;

    me.fuse.css('width','100%');
    me.fuse.css('backgroundColor','red');
    me.fuse.animate({width:'0px'},countdown);

    setTimeout(function(){
      me.ring(callback);
    }, countdown);
  };

  this.constructor();
}

var bells = [];

var bell = new Bell('sounds/bell.mp3','img/bell.jpg');
var cowbell = new Bell('sounds/cowbell.mp3', 'img/cowbell.jpg');
var deskbell = new Bell('sounds/deskbell.mp3', 'img/deskbell.jpg');
var doorbell = new Bell('sounds/doorbell.mp3', 'img/doorbell.jpg');
var gong = new Bell('sounds/gong.mp3', 'img/gong.jpg');

// bell.delayedRing(function(){
//   cowbell.delayedRing(function(){
//     deskbell.delayedRing(function(){
//       doorbell.delayedRing(function(){
//         gong.delayedRing();
//       });
//     });
//   });
// });

var delayedRingers = function(numBells){
  if (numBells != 0){
    var rand = Math.floor(Math.random()*bells.length);
    bells[rand].delayedRing(function(){
      delayedRingers(numBells-1);
    });
  }  
};

var ringRandom = function(time){
  setInterval(function(){
    var rand = Math.floor(Math.random()*bells.length);
    bells[rand].ring();
  },time);
}

$(function(){
  $('#ring').on('click',function(){
    var numBells = $('#numBells').val();
    delayedRingers(numBells);
  });
});