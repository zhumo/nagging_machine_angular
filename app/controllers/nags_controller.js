naggingMachine
  .controller("NagsController", ["$http", 'SessionsManager', 'NagsManager', '$timeout', function($http, SessionsManager, NagsManager, $timeout){

    var ctrl = this;
    ctrl.nags = [];

    ctrl.declareDone = function(doneNagId){
      var toggledNag = ctrl.nags.filter(function(nag){
        return nag.id == doneNagId;
      })[0];

      NagsManager.declareNagDone(toggledNag.id)
        .then(
          function(){
            toggledNag.status = "done";
          }, 
          function(){
            alert("Oops! Something went wrong! We were not able to change that nag's status");
            $("#nag-checkbox-" + toggledNag.id).attr("checked", false);
          }
        );
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
