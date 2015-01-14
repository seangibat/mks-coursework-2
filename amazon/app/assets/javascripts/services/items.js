app.factory('Items', function ($resource) {
  var service = {};
  var Item = $resource('/items/:id', {id:'@id'}, {update: {method: 'PATCH'}});
  service.items = Item.query();

  service.reduceQuantity = function(itemId){
    service.items.forEach(function(value){
      if (value.id === itemId){
        value.quantity--;
      }
    });
  } 

  service.increaseQuantity = function(itemId){
    service.items.forEach(function(value){
      if (value.id === itemId){
        value.quantity++;
      }
    });
  }

  return service;
});