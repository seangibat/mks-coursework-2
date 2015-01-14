app.controller('ItemsController', ['$scope', 'Items', 'Cart', function($scope, Items, Cart){
  $scope.items = Items;
  $scope.cart = Cart;
}]);