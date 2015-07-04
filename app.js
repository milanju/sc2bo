if (Meteor.isClient) {
  Session.set("status", "splash");
  Session.set("playerStatus", "pause");
  Session.set("playerTime", 0);
}

if (Meteor.isServer) {
  Meteor.startup(function () {
  //startup code
  });
}
