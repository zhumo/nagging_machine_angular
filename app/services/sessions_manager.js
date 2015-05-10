naggingMachine
  .service("SessionsManager", ["$http", "$location", "$cookies", function($http, $location, $cookies){

    this.createNewSession = function(phoneNumber, password){
      $http.post("http://localhost:3000/api/sessions", {phone_number: phoneNumber, password: password})
        .then(function(response){
          var authToken = response.data.auth_token;
          $cookies.authToken = authToken;
          $cookies.firstName = response.data.first_name;
          $cookies.status    = response.data.user_status;

          $location.path("/mynags");
          $location.replace();
          return true;
        }, function(err){
          var authToken = undefined;
          alert(err.status + ": " + err.statusText);
          return false;
        }
      );
    };

    this.destroySession = function(){
      delete $cookies.authToken;
      delete $cookies.firstName;
      delete $cookies.status;
      $location.path("/");
      $location.replace();
    }

    this.getAuthToken = function(){
      return $cookies.authToken;
    };

    this.getUserFirstName = function(){
      return $cookies.firstName;
    };

    this.getUserStatus = function(){
      return $cookies.status;
    };

    this.loggedIn = function(){
      if($cookies.authToken == undefined){
        return false;
      }else{
        return true;
      }
    };
  }]);
