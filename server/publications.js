Meteor.publish('buildOrders', function() {
  return BuildOrders.find({userId: this.userId});
});
