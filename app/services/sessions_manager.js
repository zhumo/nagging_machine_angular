naggingMachine
  .service("SessionsManager", ["$http", "$location", "$cookies", function($http, $location, $cookies){

    this.createNewSession = function(phoneNumber, password){
      $http.post("http://localhost:3000/api/sessions", {phone_number: phoneNumber, password: password})
        .then(function(response){
          var authToken = response.data.auth_token;
          $cookies.authToken = authToken;

          $location.path("/mynags");
          $location.replace();
          return true;
        }, function(err){
          var authToken = undefined;
          alert(err.status + ": " + err.statusText);
          return false
        }
      );
    };

    this.destroySession = function(){
      $cookies.authToken = undefined;
      $location.path("/");
      $location.replace();
    }

    this.getAuthToken = function(){
      return $cookies.authToken;
    };

    this.loggedIn = function(){
      if($cookies.authToken == "undefined"){
        return false
      }else{
        return true
      }
    };
  }]);
