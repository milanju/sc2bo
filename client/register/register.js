Template.register.onRendered(function() {
  $('#register-username').focus();
});

Template.register.events({
  'submit .register-form': function(event) {
    var username = event.target[0].value;
    var password = event.target[1].value;
    var passwordConfirmed = event.target[2].value;
    if(password != passwordConfirmed) {
      Materialize.toast('Passwords did not match', 4000);
      event.target[1].value = "";
      event.target[2].value = "";
      return false;
    }
    Accounts.createUser({
      username: username,
      password: password
    }, function(err) {
      if(err) {
        Materialize.toast(err.reason, 4000);
        event.target[1].value = "";
        event.target[2].value = "";
      } else {
        FlowRouter.go('home');
      }
    });
    return false;
  }
});
