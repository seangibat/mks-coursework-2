app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/items', {
        templateUrl: '<%= asset_path("/templates/items.html") %>',
        controller: 'ItemsController'
      }).
      when('/cart/', {
        templateUrl: 'templates/cart.html',
        controller: 'CartController'
      }).
      otherwise({
        redirectTo: '/items'
      });
  }]);