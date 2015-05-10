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

    ctrl.loggedIn = function(){
      return SessionsManager.loggedIn();
    }

    ctrl.userFirstName = function(){
      return SessionsManager.getUserFirstName();
    }

    ctrl.userStatus = function(){
      return SessionsManager.getUserStatus();
    }

    ctrl.userActive = function(){
      return ctrl.userStatus() == "active";
    }
  }]);
