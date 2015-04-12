naggingMachine.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true
  });

  $routeProvider
    .when("/login", {
      templateUrl: "app/templates/sessions/new.html",
      controller: "NagsController"
    })
    .when("/mynags", {
      templateUrl: "app/templates/nags/index.html"
    })
    .otherwise("/login");
}]);
