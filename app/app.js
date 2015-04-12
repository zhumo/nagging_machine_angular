angular.module("naggingMachine", [])
  .controller("NagsController", ['$scope', "$http", 'SessionsManager', 'NagsManager', '$timeout', function($scope, $http, SessionsManager, NagsManager, $timeout){

    $scope.phoneNumber = undefined;
    $scope.nags = [];

    this.toggleDone = function(doneNagId){
      var toggledNag = $scope.nags.filter(function(nag){
        return nag.id == doneNagId;
      })[0];

      if(toggledNag.status == "done"){
        toggledNag.status = "active";
      }else{
        toggledNag.status = "done";
      }
    }

    this.createNewSession = function(){
      SessionsManager.createNewSession(this.phoneNumber);
      setTimeout(function(){
        NagsManager.getNags(SessionsManager.getUserId()).then(function(response){
          $scope.nags = response.data;
          $("#signInModal").modal("hide");  
        });
      }, 1500);
    }
    
    this.addNag = function(){
      var newNag = {
        id: $scope.nags.length,
        user_id: SessionsManager.getUserId(),
        contents: this.newNag.contents,
        status: "active",
        ping_count: 0
      }
      $scope.nags.push(newNag);
      $scope.newNag = undefined;

      $http.post("http://localhost:3000/api/nags", newNag)
    }

  }])

  .service("NagsManager", ["$http", function($http){
    return {
      getNags: function(userId){
        return $http.get("http://localhost:3000/api/nags?user_id=" + userId);
      }
    }
  }])
  
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
