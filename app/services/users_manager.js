naggingMachine
  .service("UsersManager", ["$http", "$cookies", function($http, $cookies){
    this.stopNags = function(){
      $http.put("http://localhost:3000/api/users/" + $cookies.authToken + "/stop")
        .then(function(){
          $cookies.status = "stopped"
        }, function(){
          alert("Something went wrong!");
        });
    }

    this.restartNags = function(){
      $http.put("http://localhost:3000/api/users/" + $cookies.authToken + "/restart")
        .then(function(){
          $cookies.status = "active"
        }, function(){
        });
    }
  }]);
