BuildOrders = new Meteor.Collection("builOrders");
BuildOrders.allow({
  insert: function (userId, doc) {
    return userId;
  },
  update: function (userId, doc, fields, modifier) {
    return doc.userId === userId;
  },
  remove: function (userId, doc) {
    return doc.userId === userId;
  }
});
