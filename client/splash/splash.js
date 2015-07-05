Template.splash.helpers({
  'buildOrders': function() {
    return BuildOrders.find({});
  }
});

Template.splash.events({
  'click .build-order-td': function(event) {
    Session.set("activeBo", this._id);
    Session.set("status", "editBo");
    document.body.scrollIntoView();
  },
  'click .remove-bo': function(event) {
    BuildOrders.remove({_id: this._id});
  }
})
