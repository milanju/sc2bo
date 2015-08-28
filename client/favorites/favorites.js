Template.favorites.helpers({
  buildOrders: function() {
    var matchups = [];
    var expansion = "HotS";
    var sort = {score: -1};
    var favorites = Meteor.user().favorites;
    // Filter Protoss Matchups
    if(Session.get("player-race") === "protoss") {
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
    if(Session.get("player-race") === "terran") {
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
    if(Session.get("player-race") === "zerg") {
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
    if(Session.get("filter-exp-HotS")) expansion = "HotS";
    if(Session.get("filter-exp-LotV")) expansion = "LotV";

    if(Session.get("sort-top")) sort = {score: -1};
    if(Session.get("sort-new")) sort = {createdAt: -1};

    return BuildOrders.find({_id: {$in: favorites}, published: "true", expansion: expansion, matchup: {$in: matchups}}, {sort: sort});
  }
});
