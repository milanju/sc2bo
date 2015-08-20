Template.userButton.events({
  'click .logout-btn': function() {
    Meteor.logout();
  }
});
