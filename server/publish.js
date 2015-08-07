Meteor.publish("buildOrders", function(attributes) {
  return BuildOrders.find({
    $or: [
      {userId: this.userId},
      {$and: [
        {published: true},
        {$or: [
          {privacy: "public"},
          {privacy: "unlisted"}
        ]}
      ]}
    ]
  }, attributes);
});

Meteor.publish(null, function() {
  return Meteor.users.find({_id: this.userId}, {fields: {favorites: 1, upvotes: 1, downvotes: 1}});
});
