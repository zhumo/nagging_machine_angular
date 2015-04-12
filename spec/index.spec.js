describe("Controller: NagsController", function(){
  beforeEach(module('naggingMachine'));

  var ctrl, httpBackend;

  beforeEach(inject(function($injector){
    httpBackend = $injector.get("$httpBackend");
    ctrl = $injector.get("$controller")("NagsController");
    httpBackend.when("GET", "http://localhost:3000/nags").responds([
      {id: 1, contents: "Trash", status: "active", ping_count: 0, user_id: 1},
      {id: 2, contents: "Gym", status: "active", ping_count: 1, user_id: 1},
      {id: 3, contents: "Mom's Birthday", status: "active", ping_count: 9, user_id: 1},
      {id: 4, contents: "Clean Bathroom", status: "done", ping_count: 0, user_id: 1},
      {id: 5, contents: "Call girlfriend", status: "active", ping_count: 3, user_id: 1},
      {id: 6, contents: "Read a book", status: "done", ping_count: 5, user_id: 1}
    ])
  }));

  afterEach(function(){
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
  
  it("should have nags available on load", function(){
    console.log("nags: " + ctrl.nags);
    expect(ctrl.nags).toEqual(
      [{id: 1, contents: "Trash", status: "active", ping_count: 0, user_id: 1},
      {id: 2, contents: "Gym", status: "active", ping_count: 1, user_id: 1},
      {id: 3, contents: "Mom's Birthday", status: "active", ping_count: 9, user_id: 1},
      {id: 4, contents: "Clean Bathroom", status: "done", ping_count: 0, user_id: 1},
      {id: 5, contents: "Call girlfriend", status: "active", ping_count: 3, user_id: 1},
      {id: 6, contents: "Read a book", status: "done", ping_count: 5, user_id: 1}]
    ); 
  });

  describe("addNag()", function(){
    it("should add nags", function(){
      var nagsLength = ctrl.nags.length;

      var newNagContents = "Wash dishes";
      ctrl.newNag = {};
      ctrl.newNag.contents = newNagContents;
      ctrl.addNag();

      expect(ctrl.nags.length).toBe(nagsLength + 1);
      expect(ctrl.nags[ctrl.nags.length - 1].contents).toBe(newNagContents);
    });
  });

  describe("toggleNag()", function(){
    it("should mark an active nag as done", function(){
      var activeNags = ctrl.nags.filter(function(nag){return nag.status == "active";});

      var randomActiveNagId = activeNags[Math.floor(Math.random() * activeNags.length)].id;
      ctrl.toggleDone(randomActiveNagId);
      
      expect(ctrl.nags.filter(function(obj){return obj.id == randomActiveNagId;})[0].status).toBe("done");
    });

    it("should mark done nag as active", function(){
      var doneNags = ctrl.nags.filter(function(nag){return nag.status == "done";});

      var randomDoneNagId = doneNags[Math.floor(Math.random() * doneNags.length)].id;
      ctrl.toggleDone(randomDoneNagId);
      
      expect(ctrl.nags.filter(function(obj){return obj.id == randomDoneNagId;})[0].status).toBe("active");
    });
  });

  /*
  it("should mark nag as done", function(){
  });
  */
});
