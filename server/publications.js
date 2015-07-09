Meteor.publish('buildOrders', function() {
  return BuildOrders.find({$or: [{userId: this.userId}, {privacy: "public"}]});
});
