naggingMachine
  .controller("NagsController", ["$http", 'SessionsManager', 'NagsManager', '$timeout', function($http, SessionsManager, NagsManager, $timeout){

    var ctrl = this;
    ctrl.nags = [];

    ctrl.toggleDone = function(doneNagId){
      var toggledNag = ctrl.nags.filter(function(nag){
        return nag.id == doneNagId;
      })[0];

      if(toggledNag.status == "done"){
        toggledNag.status = "active";
      }else{
        toggledNag.status = "done";
      }
    }

    NagsManager.getNags(SessionsManager.getAuthToken()).then(function(response){
      for(nagIndex in response.data){
        ctrl.nags.push(response.data[nagIndex]);
      }
    });
    
    ctrl.addNag = function(){
      var newNag = {
        id: ctrl.nags.length,
        auth_token: SessionsManager.getAuthToken(),
        contents: ctrl.newNag.contents,
        status: "active",
        ping_count: 0
      }
      ctrl.nags.push(newNag);
      ctrl.newNag = undefined;

      $http.post("http://localhost:3000/api/nags", newNag)
    }

  }])
