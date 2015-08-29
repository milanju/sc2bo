Template.favorites.helpers({
  buildOrders: function() {
    var matchups = [];
    var expansion = "HotS";
    var sort = {score: -1};
    var favorites = Meteor.user().favorites;
    
    // Filter Protoss Matchups
    var pushProtoss = false;
    if(Meteor.user()) {
      if(Meteor.user().race === "protoss") pushProtoss = true;
    } else {
      if(Session.get("player-race") === "protoss") pushProtoss = true;
    }
    if(pushProtoss) {
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
    var pushTerran = false;
    if(Meteor.user()) {
      if(Meteor.user().race === "terran") pushTerran = true;
    } else {
      if(Session.get("player-race") === "terran") pushTerran = true;
    }
    if(pushTerran) {
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
    var pushZerg = false;
    if(Meteor.user()) {
      if(Meteor.user().race === "zerg") pushZerg = true;
    } else {
      if(Session.get("player-race") === "zerg") pushZerg = true;
    }
    if(pushZerg) {
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
