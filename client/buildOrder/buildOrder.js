Template.buildOrder.helpers({
  buildOrder: function() {
    return BuildOrders.findOne({slug: FlowRouter.current().params.slug});
  },
  isOwner: function() {
    if(this.userId === Meteor.userId()){
      return true;
    }
  }
});

Template.buildOrder.events({
  'click .edit-bo': function() {
    FlowRouter.go("/bo/" + FlowRouter.current().params.slug + "/edit")
  }
});
