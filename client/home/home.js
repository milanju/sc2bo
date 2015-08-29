Template.home.onCreated(function() {
  var instance = this;
  Session.set("limit", 8);
  var sort;
  var expansion;
  this.ready = new ReactiveVar(false);
  instance.autorun(function() {
    var matchups = [];

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
    if(Session.get("sort-top")) sort = {score: -1};
    if(Session.get("sort-new")) sort = {createdAt: -1};
    if(Session.get("filter-exp-HotS")) expansion = "HotS";
    if(Session.get("filter-exp-LotV")) expansion = "LotV";

    this.subscription = subs.subscribe('publicBuildOrders', Session.get("limit"), sort, expansion, matchups);
    instance.ready.set(false);
    if(this.subscription.ready()) {
      instance.ready.set(true);
    }
  });
});

Template.home.helpers({
  buildOrders: function() {
    var matchups = [];
    var expansion = "HotS";
    var sort = {score: -1};
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
    if(Session.get("filter-exp-WoL")) expansion = "WoL";
    if(Session.get("sort-top")) sort = {score: -1};
    if(Session.get("sort-new")) sort = {createdAt: -1};
    var limit = 8;
    if(Session.get("limit")) {
      limit = Session.get("limit");
    }
    return BuildOrders.find({privacy: "public", published: "true", expansion: expansion, matchup: {$in: matchups}}, {sort: sort, limit: limit});
  },
  subsReady: function() {
    if(Template.instance().ready.get()) return true;
    return false;
  }
});

Template.home.events({
  'click .home-load-more': function() {
    if(Session.get("limit")) {
      Session.set("limit", Session.get("limit") + 8);
    }
    return false;
  }
});
