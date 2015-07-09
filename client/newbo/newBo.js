Template.newBo.events({
  "submit #new-bo-form": function (event) {
    console.log(event);
    var name = event.target.elements[0].value;
    var description = event.target.elements[1].value;
    var timeStrategy;

    if(event.target.elements[4].checked === true) {
      timeStrategy = "blizzard";
    } else {
      timeStrategy = "real";
    }

    if(event.target.elements[6].checked === true) {
      privacy = "private";
    } else {
      privacy = "public";
    }

    if(event.target.elements[2][1].selected === true) {
      playerRace = "terran";
    } else if (event.target.elements[2][2].selected === true) {
      playerRace = "protoss";
    } else if (event.target.elements[2][3].selected === true){
      playerRace = "zerg";
    }

    if(event.target.elements[3][1].selected === true) {
      opponentRace = "terran";
    } else if (event.target.elements[3][2].selected === true) {
      opponentRace = "protoss";
    } else if (event.target.elements[3][3].selected === true){
      opponentRace = "zerg";
    }
    
    console.log(event);
    var boId = BuildOrders.insert({
      name: name,
      description: description,
      userId: Meteor.user()._id,
      privacy: privacy,
      playerRace: playerRace,
      opponentRace: opponentRace,
      timeStrategy: timeStrategy,
      buildOrder: []
    });
    Session.set("activeBo", boId);
    Session.set("status", "editBo");
    return false;
  }
});
