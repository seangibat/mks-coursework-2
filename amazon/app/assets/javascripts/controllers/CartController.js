app.controller('CartController', ['$scope', 'Items', 'Cart', function($scope, Items, Cart){
  $scope.cart = Cart;
}]);