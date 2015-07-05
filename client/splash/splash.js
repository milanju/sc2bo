Template.splash.helpers({
  'buildOrders': function() {
    return BuildOrders.find({});
  }
});

Template.splash.events({
  'click .build-order-li': function(event) {
    Session.set("activeBo", this._id);
    Session.set("status", "editBo");
    document.body.scrollIntoView();
  }
})
