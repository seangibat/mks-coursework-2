app.controller('TopBarController', ['$scope', 'Cart', function($scope, Cart){
  $scope.cart = Cart;
}]);