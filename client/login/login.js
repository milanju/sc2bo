Template.login.onRendered(function() {
  $('#login-username').focus();
});

Template.login.events({
  'submit .login-form': function(event) {
    var username = event.target[0].value;
    var password = event.target[1].value;
    Meteor.loginWithPassword(username, password, function(err) {
      if(err) {
        Materialize.toast(err.reason, 4000);
      } else {
        $('#loginModal').closeModal();
        var route = FlowRouter.current().route.name;
        if((route === "login")) {
          FlowRouter.go('home');
        }
      }
    });
    event.target[1].value = "";
    return false;
  },
  'click .link-to-register-btn': function() {
    $('#loginModal').closeModal();
    $('#registerModal').openModal();
    setTimeout(function() {
      $('#register-username').focus();
    }, 100);
    return false;
  }
});
