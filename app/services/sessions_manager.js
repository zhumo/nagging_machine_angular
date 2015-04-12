naggingMachine
  .service("SessionsManager", ["$http", function($http){
    var userId = undefined;

    return {
      createNewSession: function(phoneNumber){
        $http.post("http://localhost:3000/api/sessions", {phone_number: phoneNumber}).then(function(response){
          userId = response.data;
        });
      },
      getUserId: function(){
        return userId;
      }
    };
  }]);
