Template.registerHelper('isReady', function(sub) {
  if(sub) {
    return FlowRouter.subsReady(sub);
  } else {
    return FlowRouter.subsReady();
  }
});

Template.registerHelper("formatedDate", function (date) {
    return moment(date).format('lll');
});

Template.registerHelper("raceNotPicked", function (date) {
    if(Meteor.user()) {
      var race = Meteor.user().race;
      if(race === "protoss" || race === "terran" || race === "zerg") {
        return false;
      } else {
        return true;
      }
    } else {
      var race = Session.get("player-race");
      if(race === "protoss" || race === "terran" || race === "zerg") {
        return false;
      } else {
        return true;
      }
    }
});
