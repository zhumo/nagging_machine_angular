naggingMachine
  .controller("SessionsController", ["SessionsManager", function(SessionsManager){
    var ctrl = this;

    ctrl.phoneNumber = undefined;
    ctrl.password = undefined;

    ctrl.createNewSession = function(){
      SessionsManager.createNewSession(ctrl.phoneNumber, ctrl.password);
      ctrl.phoneNumber = undefined;
      ctrl.password = undefined;
    };

  }]);
