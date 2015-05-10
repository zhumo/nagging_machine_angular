naggingMachine
  .controller("UsersController", ["UsersManager", function(UsersManager){
    var ctrl = this;

    ctrl.stopNags = function(){
      UsersManager.stopNags();
    }

    ctrl.restartNags = function(){
      UsersManager.restartNags();
    }
  }]);
