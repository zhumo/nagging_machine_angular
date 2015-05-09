naggingMachine
  .service("SessionsManager", ["$http", "$location", function($http, $location){
    var authToken;

    this.createNewSession = function(phoneNumber, password){
      $http.post("http://localhost:3000/api/sessions", {phone_number: phoneNumber, password: password})
        .then(function(response){
          authToken = response.data.auth_token;
          $location.path("/mynags");
          $location.replace();
        }, function(err){
          authToken = undefined;
          alert(err.status + ": " + err.statusText);
        }
      );
    };

    this.getAuthToken = function(){
      return authToken;
    };

    this.loggedIn = function(){
      if(typeof(authToken) === "string"){
        return true
      }else{
        return false
      }
    };
  }]);
