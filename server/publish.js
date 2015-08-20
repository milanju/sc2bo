Meteor.publish("buildOrders", function(attributes) {
  return BuildOrders.find({
    $or: [
      {userId: this.userId},
      {$and: [
        {published: "true"},
        {$or: [
          {privacy: "public"},
          {privacy: "unlisted"}
        ]}
      ]}
    ]
  }, attributes);
});

Meteor.publish("favoriteBuildOrders", function() {
  var favorites = []
  if(this.userId){
    var favorites = Meteor.users.findOne({_id: this.userId}).favorites;
  }
  return BuildOrders.find({
    $or: [
      {userId: this.userId},
      {$and: [
        {published: "true"},
        {$or: [
          {privacy: "public"},
          {privacy: "unlisted"}
        ]}
      ]}
    ]
  }, {_id: {$in: favorites}});
});

Meteor.publish("publicBuildOrders", function(limit, sort, expansion, matchups) {
  return BuildOrders.find({
    published: "true",
    privacy: "public",
    expansion: expansion,
    matchup: {$in: matchups}
  }, {sort: sort, limit: limit});
});

Meteor.publish("myBuildOrders", function() {
  return BuildOrders.find({
    userId: this.userId
  });
});

Meteor.publish("deletedBuildOrders", function() {
  if(Roles.userIsInRole(this.userId, ['admin', 'moderator'])) {
    console.log("yeah..");
    return BuildOrders.find({
      published: "deleted"
    });
  }
});

Meteor.publish("allUsers", function() {
  if(Roles.userIsInRole(this.userId, ['admin', 'moderator'])) {
    return Meteor.users.find();
  }
})

Meteor.publish(null, function() {
  return Meteor.users.find({_id: this.userId}, {fields: {favorites: 1, upvotes: 1, downvotes: 1, style: 1, admin: 1, isBanned: 1}});
});
