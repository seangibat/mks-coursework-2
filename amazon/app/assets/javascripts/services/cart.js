app.factory('Cart', function(Items, $resource){
  var Order = $resource('/orders/:id', {id:'@id'});

  var service = {};

  service.cart = [];
  service.quantities = {};
  service.total = 0;
  service.cost = 0;

  service.addToCart = function(item){ 
    if (!service.quantities[item.id]){
      service.quantities[item.id] = 1;
      service.cart.push(item);
    }
    else {
      service.quantities[item.id]++;
    }
    service.total++;
    service.cost += item.price;
    Items.reduceQuantity(item.id);
  };

  service.removeFromCart = function(item){ 
    if (service.quantities[item.id] > 0){
      service.quantities[item.id]--;
      service.total--;
      service.cost -= item.price;
      Items.increaseQuantity(item.id);
      if (service.quantities[item.id] === 0){
        service.cart.forEach(function(item2, index){
          if (item2.id === item.id)
            service.cart.splice(index,1);
        });
      }
    }
    else {
      return null;
    }
  };

  service.checkout = function(name){
    var order = new Order({person: name, cost: service.cost});

    var success = function(){
      service.cart.forEach(function(item){
        item.$update();
      });
      service.total = 0;
      service.cost = 0;
      service.cart.length = 0;
      for (prop in service.quantities) { 
        if (service.quantities.hasOwnProperty(prop)) { 
          delete service.quantities[prop]; 
        } 
      }
    }

    var error = function(err){
      console.log(err);
    }
    
    order.$save(success, error);
  };

  return service;
});