Meteor.publish("buildOrders", function(attributes) {
  return BuildOrders.find({
    $or: [
      {$and: [
        {published: {$ne: "deleted"}},
        {userId: this.userId}
      ]},
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

Meteor.publish("buildOrder", function(slug) {
  return BuildOrders.find({
    slug: slug,
    $or: [
      {$and: [
        {published: {$ne: "deleted"}},
        {userId: this.userId}
      ]},
      {$and: [
        {published: "true"},
        {$or: [
          {privacy: "public"},
          {privacy: "unlisted"}
        ]}
      ]}
    ]
  });
});

Meteor.publish("favoriteBuildOrders", function() {
  var favorites = []
  if(this.userId){
    var favorites = Meteor.users.findOne({_id: this.userId}).favorites;
  }
  return BuildOrders.find({
    $or: [
      {$and: [
        {published: {$ne: "deleted"}},
        {userId: this.userId}
      ]},
      {$and: [
        {published: "true"},
        {$or: [
          {privacy: "public"},
          {privacy: "unlisted"}
        ]}
      ]}
    ], _id: {$in: favorites}
  });
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
    userId: this.userId,
    $or: [{published: "true"}, {published: "false"}]
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
});

Meteor.publish("openReports", function() {
  if(Roles.userIsInRole(this.userId, ['admin', 'moderator'])) {
    return Reports.find({
      solved: false
    });
  }
});

Meteor.publish("closedReports", function() {
  if(Roles.userIsInRole(this.userId, ['admin', 'moderator'])) {
    return Reports.find({
      solved: true
    });
  }
});

Meteor.publish("openReportedBos", function() {
  if(Roles.userIsInRole(this.userId, ['admin', 'moderator'])) {
    var reports = Reports.find().fetch();
    var boIds = [];
    for(var i = 0; i < reports.length; i++) {
      boIds.push(reports[i].boId);
    }
    return BuildOrders.find({_id: {$in: boIds}});
  }
});

Meteor.publish("reportsForBo", function(boId) {
  if(Roles.userIsInRole(this.userId, ['admin', 'moderator'])) {
    return Reports.find({boId: boId});
  }
});

Meteor.publish("unreadFeedback", function() {
  if(Roles.userIsInRole(this.userId, ['admin'])) {
    return Feedback.find({readBy: {$nin: [this.userId]}});
  }
});

Meteor.publish("readFeedback", function() {
  if(Roles.userIsInRole(this.userId, ['admin'])) {
    return Feedback.find({readBy: this.userId});
  }
});

Meteor.publish("unsolvedBugs", function() {
  if(Roles.userIsInRole(this.userId, ['admin'])) {
    return Bugs.find({solved: false});
  }
});

Meteor.publish("solvedBugs", function() {
  if(Roles.userIsInRole(this.userId, ['admin'])) {
    return Bugs.find({solved: true});
  }
});

Meteor.publish(null, function() {
  return Meteor.users.find({_id: this.userId}, {fields: {favorites: 1, upvotes: 1, downvotes: 1, style: 1, admin: 1, isBanned: 1}});
});
