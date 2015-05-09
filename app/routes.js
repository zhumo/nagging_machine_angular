naggingMachine.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true
  });

  $routeProvider
    .when("/", {
      templateUrl: "app/templates/home.html",
      resolve: {
        auth: ["$location", "SessionsManager", function($location, SessionsManager){
          if(SessionsManager.loggedIn() == true){
            $location.path("/mynags");
            $location.replace();
          }
        }]
      }
    })
    .when("/login", {
      templateUrl: "app/templates/sessions/new.html",
      resolve: {
        auth: ["$location", "SessionsManager", function($location, SessionsManager){
          if(SessionsManager.loggedIn() == true){
            $location.path("/mynags");
            $location.replace();
          }
        }]
      }
    })
    .when("/mynags", {
      templateUrl: "app/templates/nags/index.html",
      resolve: {
        auth: ["$location", "SessionsManager", function($location, SessionsManager){
          if(SessionsManager.loggedIn() == false){
            $location.path("/login");
            $location.replace();
          }
        }]
      }
    })
    .otherwise("/");
}]);
