app.controller('ItemsController', ['$scope', 'Items', 'Cart', function($scope, Items, Cart){
  $scope.items = Items;
  $scope.cart = Cart;

  $scope.sortOptions = ['name', 'price', 'quantity'];
  $scope.layoutOptions = ['grid', 'list'];

  $scope.selectedOrder = $scope.sortOptions[0];
  $scope.layout = $scope.layoutOptions[0];
}]);