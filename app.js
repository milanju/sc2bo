if (Meteor.isClient) {
  Session.set("status", "splash");
}

if (Meteor.isServer) {
  Meteor.startup(function () {
  //startup code
  });
}
