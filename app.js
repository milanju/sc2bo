if (Meteor.isClient) {
  Session.set("status", "splash");
  Session.set("playerStatus", "pause");
  Session.set("playerTime", 0);

  Template.home.events({
    'click #logo': function() {
      Session.set("status", "splash");
      Session.set("playerStatus", "pause");
      Session.set("playerTime", 0);
      Meteor.clearInterval(Session.get("interval"));
    }
  });

  Template.home.helpers({
    'buildOrders': function() {
      return BuildOrders.find({});
    }
  });
  
}

if (Meteor.isServer) {
  Meteor.startup(function () {
  //startup code
  });
}
