Template.modDeleted.helpers({
  buildOrders: function() {
    return BuildOrders.find({published: "deleted"});
  }
});
