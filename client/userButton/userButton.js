Template.userButton.events({
  'click .logout-btn': function() {
    Meteor.logout();
  },
  'click .login-btn': function() {
    $('#loginModal').openModal();
    setTimeout(function() {
      $('#login-username').focus();
    }, 100);
    return false;
  }
});
