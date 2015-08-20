Template.mainLayout.onRendered(function() {
  $(".button-collapse").sideNav();
});

Template.mainLayout.helpers({
  styleLight: function() {
    var user = Meteor.user();
    if(user) {
      if(user.style === "dark") return;
      return "checked";
    } else {
      if(Session.get("style") === "dark") return;
      return "checked";
    }
  },
  styleDark: function() {
    var user = Meteor.user();
    if(user) {
      if(user.style === "dark") return true
      return;
    } else {
      if(Session.get("style") === "dark") return true;
      return false;
    }
  }
});

Template.mainLayout.events({
  'click .side-nav a': function() {
    $('.button-collapse').sideNav('hide');
  },
  'click .style-switch': function(event) {
    var user = Meteor.user();
    if(user) {
      Meteor.call("userToggleStyle");
    } else {
      if(Session.get("style") === "dark") {
        Session.set("style", "light");
        localStorage.setItem("style", "light");
      } else {
        Session.set("style", "dark");
        localStorage.setItem("style", "dark");
      }
    }
    return false;
  }
});
