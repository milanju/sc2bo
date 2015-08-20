if(Meteor.isClient) {
  Meteor.startup(function() {
    Session.set("style", localStorage.getItem("style"));
  });
}
