Template.newBoButton.events({
  "click .new-bo": function(event, template){
    if(Meteor.user()) {
      FlowRouter.go("/bo/new");
    } else {
      $('#loginModal').openModal();
      setTimeout(function() {
        $('#login-username').focus();
      }, 100)
    }
  }
});
