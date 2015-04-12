naggingMachine
  .service("NagsManager", ["$http", function($http){
    return {
      getNags: function(userId){
        return $http.get("http://localhost:3000/api/nags?user_id=" + userId);
      }
    }
  }])
  
