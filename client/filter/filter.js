Template.filter.helpers({
  playerFilter: function(race) {
    if(Session.get("filter-player-"+race) === true) return "filtered";
  },
  oppFilter: function(race) {
    if(Session.get("filter-opp-"+race) === true) return "filtered";
  }
});

Template.filter.events({
  'click .player-race-btn': function(event) {
    var race = event.target.value;
    if(Session.get("filter-player-"+race) === true) {
      Session.set("filter-player-"+race, false);
    } else {
      Session.set("filter-player-"+race, true);
    }
  },
  'click .opp-race-btn': function(event) {
    var race= event.target.value;
    if(Session.get("filter-opp-"+race) === true) {
      Session.set("filter-opp-"+race, false);
    } else {
      Session.set("filter-opp-"+race, true);
    }
  }
});
