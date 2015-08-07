Template.favorites.helpers({
  buildOrders: function() {
    var matchups = [];
    var favorites = Meteor.user().favorites;
    // Filter Protoss Matchups
    if(!Session.get("filter-player-protoss")) {
      if(!Session.get("filter-opp-protoss")) {
        matchups.push("PvP");
      }
      if(!Session.get("filter-opp-terran")) {
        matchups.push("PvT");
      }
      if(!Session.get("filter-opp-zerg")) {
        matchups.push("PvZ");
      }
    }

    // Filter Terran Matchups
    if(!Session.get("filter-player-terran")) {
      if(!Session.get("filter-opp-protoss")) {
        matchups.push("TvP");
      }
      if(!Session.get("filter-opp-terran")) {
        matchups.push("TvT");
      }
      if(!Session.get("filter-opp-zerg")) {
        matchups.push("TvZ");
      }
    }

    // Filter Zerg Matchups
    if(!Session.get("filter-player-zerg")) {
      if(!Session.get("filter-opp-protoss")) {
        matchups.push("ZvP");
      }
      if(!Session.get("filter-opp-terran")) {
        matchups.push("ZvT");
      }
      if(!Session.get("filter-opp-zerg")) {
        matchups.push("ZvZ");
      }
    }
    return BuildOrders.find({_id: {$in: favorites}, matchup: {$in: matchups}}, {sort: {score: -1}});
  }
});
