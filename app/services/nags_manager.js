naggingMachine
  .service("NagsManager", ["$http", function($http){
      this.getNags = function(authToken){
        return $http.get("http://localhost:3000/api/nags?auth_token=" + authToken);
      }

      this.declareNagDone = function(nagId){
        return $http.put("http://localhost:3000/api/nags/" + nagId + "/done");
      }
  }])
  
