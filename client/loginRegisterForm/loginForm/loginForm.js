Template.loginForm.onCreated(function() {
  this.error = new ReactiveVar("");
});

Template.loginForm.helpers({
});

Template.loginForm.events({
  'submit #login-form': function(event, template) {
    var username = event.target.elements[0].value;
    var password = event.target.elements[1].value;
    Meteor.loginWithPassword(username, password, function(error) {
      if(error) {
        event.target.elements[1].value = "";
        template.error.set(error.message);
      }
    });
    return false;
  }
});
