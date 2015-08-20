Template.filter.helpers({
  playerFilter: function(race) {
    if(Session.get("filter-player-"+race) === true) return "filtered";
  },
  oppFilter: function(race) {
    if(Session.get("filter-opp-"+race) === true) return "filtered";
  },
  expansionFilter: function(expansion) {
    if(Session.get("filter-exp-" + expansion) != true) return "filtered";
  },
  sortRadio: function(sort) {
    if(Session.get("sort-" + sort) != true) return "filtered";
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
    Session.set("limit", 8);
  },
  'click .opp-race-btn': function(event) {
    var race= event.target.value;
    if(Session.get("filter-opp-"+race) === true) {
      Session.set("filter-opp-"+race, false);
    } else {
      Session.set("filter-opp-"+race, true);
    }
    Session.set("limit", 8);
  },
  'click .expansion-radio-btn': function(event) {
    var expansion = event.target.value;
    if(!(Session.get("filter-exp-" + expansion))) {
      if(expansion !== "HotS") Session.set("filter-exp-HotS", false);
      if(expansion !== "LotV") Session.set("filter-exp-LotV", false);
      if(expansion !== "WoL") Session.set("filter-exp-WoL", false);
      Session.set("filter-exp-" + expansion, true);
      Session.set("limit", 8);
    }
  },
  'click .sort-btn': function(event) {
    var sort = event.target.value;
    if(!(Session.get("sort-" + sort))) {
      if(sort !== "top") Session.set("sort-top", false);
      if(sort !== "new") Session.set("sort-new", false);
      if(sort !== "hot") Session.set("sort-hot", false);
      Session.set("sort-" + sort, true);
      Session.set("limit", 8);
    }
  }
});
