naggingMachine
  .controller("SessionsController", ["SessionsManager", "$location", function(SessionsManager, $location){
    var ctrl = this;

    ctrl.phoneNumber = undefined;
    ctrl.password    = undefined;

    ctrl.createNewSession = function(){
      if(SessionsManager.createNewSession(ctrl.phoneNumber, ctrl.password)){
        ctrl.phoneNumber = undefined;
        ctrl.password    = undefined;
      }
    };

    ctrl.destroyCurrentSession = function(){
      SessionsManager.destroySession();
    }

  }]);
