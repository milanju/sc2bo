Template.editButton.helpers({
  isOwner: function() {
    var user = Meteor.user();
    if((this.userId === user._id) || (Roles.userIsInRole(user, ['admin','moderator']))){
      return true;
    }
  }
});

Template.editButton.events({
  'click .edit-bo': function() {
    FlowRouter.go("/bo/" + this.slug + "/edit")
  }
});
