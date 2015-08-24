BuildOrders = new Mongo.Collection("buildOrders");
BuildOrders.friendlySlugs('title');

StepSchema = new SimpleSchema({
  supply: {
    type: String,
    max: 100
  },
  action: {
    type: String,
    max: 400
  },
  position: {
    type: Number
  }
});

ReplaySchema = new SimpleSchema({
  _id: {
    type: String,
    max: 100
  },
  title: {
    type: String,
    max: 80
  },
  link: {
    type: String,
    max: 200
  },
  description: {
    type: String,
    max: 1000,
    optional: true
  }
});

VideoSchema = new SimpleSchema({
  _id: {
    type: String,
    max: 100
  },
  title: {
    type: String,
    max: 80
  },
  link: {
    type: String,
    max: 200
  },
  description: {
    type: String,
    max: 1000,
    optional: true
  }
});

BuildOrderSchema = new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 80,
    min: 6
  },
  bo: {
    type: [StepSchema],
    optional: true
  },
  description: {
    type: String,
    max: 50000,
    optional: true
  },
  author: {
    type: String,
    optional: true
  },
  appendix: {
    type: String,
    max: 50000,
    optional: true
  },
  expansion: {
    type: String,
    allowedValues: ['HotS', 'LotV', 'WoL'],
  },
  matchup: {
    type: String,
    allowedValues: [
      'PvP', 'PvT', 'PvZ',
      'TvP', 'TvT', 'TvZ',
      'ZvP', 'ZvT', 'ZvZ'
    ]
  },
  privacy: {
    type: String,
    allowedValues: ['public', 'private', 'unlisted']
  },
  published: {
    type: String,
    optional: true
  },
  replays: {
    type: [ReplaySchema],
    optional: true
  },
  videos: {
    type: [VideoSchema],
    optional: true
  },
  score: {
    type: Number,
    optional: true
  }
});

BuildOrders.attachSchema(BuildOrderSchema);

BuildOrders.before.insert(function (userId, doc) {
  doc.userId = userId;
  doc.createdAt = new Date();
  doc.published = "false";
  doc.bo = [];
  doc.replays = [];
  doc.videos = [];
  doc.score = 1;
  doc.author = Meteor.users.findOne({_id: userId}).username;
});

BuildOrders.after.insert(function (userId, doc) {
  var upvotes = Meteor.users.findOne({_id: userId}).upvotes;
  upvotes.push(doc._id);
  if(Meteor.isServer){
    Meteor.users.update({_id: userId}, {$set: {upvotes: upvotes}});
  }
});

BuildOrders.allow({
  insert: function(){
    return Meteor.user();
  },
  update: function(userId, doc){
    return ((userId === doc.userId) || Roles.userIsInRole(Meteor.user(), ['admin', 'moderator']));
  },
  remove: function(userId, doc){
    return (Roles.userIsInRole(Meteor.user(), ['admin']));
  }
});

BuildOrders.deny({
  update: function(userId, docs, fields, modifier) {
    return _.contains(fields, 'score') || _.contains(fields, 'author') || _.contains(fields, 'publish');
  }
});

Meteor.methods({
  getBoSlug: function(_id) {
    if(Meteor.isServer) {
      return BuildOrders.findOne(_id).slug;
    }
  },
  publishBo: function(_id) {
    var user = Meteor.user();
    var bo = BuildOrders.findOne({_id: _id});
    if((bo.userId === user._id) || Roles.userIsInRole(user, ['admin', 'moderator'])) {
      BuildOrders.update({_id: _id}, {$set: {published: "true"}});
    }
  },
  unpublishBo: function(_id) {
    var user = Meteor.user();
    var bo = BuildOrders.findOne({_id: _id});
    if((bo.userId === user._id) || Roles.userIsInRole(user, ['admin', 'moderator'])) {
      BuildOrders.update({_id: _id}, {$set: {published: "false"}});
    }
  },
  deleteBo: function(_id) {
    var user = Meteor.user();
    var bo = BuildOrders.findOne({_id: _id});
    if((bo.userId === user._id) || Roles.userIsInRole(user, ['admin', 'moderator'])) {
      BuildOrders.update({_id: _id}, {$set: {published: "deleted"}});
    }
  },
  restoreBo: function(_id) {
    var user = Meteor.user();
    if(Roles.userIsInRole(user, ['admin', 'moderator'])) {
      BuildOrders.update({_id: _id}, {$set: {published: "true"}});
    }
  },
  upvote: function(buildOrderId) {
    if(!Meteor.user()) return;
    var user = Meteor.user();
    var upvotes = user.upvotes;
    var downvotes = user.downvotes;
    var scoreMod = 1;
    var contains = function(arr, obj) {
      for (var i = 0; i < arr.length; i++) {
          if (arr[i] === obj) {
              return true;
          }
      }
      return false;
    }
    // Already upvoted, remove upvote
    if(contains(upvotes, buildOrderId)) {
      for(var i = 0; i < upvotes.length; i++) {
        if(upvotes[i] === buildOrderId) {
          upvotes.splice(i, 1);
          break;
        }
      }
      Meteor.users.update({_id: user._id}, {$set: {upvotes: upvotes}});
      BuildOrders.update({_id: buildOrderId}, {$inc: {score: -scoreMod}});
      return;
    }
    upvotes.push(buildOrderId);
    if(contains(downvotes, buildOrderId)) {
      scoreMod++;
      var index;
      for(var i = 0; i < downvotes.length; i++) {
        if(downvotes[i] === buildOrderId) {
          index = i;
        }
      }
      downvotes.splice(index, 1);
      Meteor.users.update({_id: user._id}, {$set: {downvotes: downvotes, upvotes: upvotes}});
    } else {
      Meteor.users.update({_id: user._id}, {$set: {upvotes: upvotes}});
    }
    BuildOrders.update({_id: buildOrderId}, {$inc: {score: scoreMod}});
  },
  downvote: function(buildOrderId) {
    if(!Meteor.user()) return;
    var user = Meteor.user();
    var upvotes = user.upvotes;
    var downvotes = user.downvotes;
    var scoreMod = -1;
    var contains = function(arr, obj) {
      for (var i = 0; i < arr.length; i++) {
          if (arr[i] === obj) {
              return true;
          }
      }
      return false;
    }
    // Already downvoted, remove downvote
    if(contains(downvotes, buildOrderId)) {
      for(var i = 0; i < downvotes.length; i++) {
        if(downvotes[i] === buildOrderId) {
          downvotes.splice(i, 1);
          break;
        }
      }
      Meteor.users.update({_id: user._id}, {$set: {downvotes: downvotes}});
      BuildOrders.update({_id: buildOrderId}, {$inc: {score: -scoreMod}});
      return;
    }
    downvotes.push(buildOrderId);
    if(contains(upvotes, buildOrderId)) {
      scoreMod--;
      var index;
      for(var i = 0; i < upvotes.length; i++) {
        if(upvotes[i] === buildOrderId) {
          index = i;
        }
      }
      upvotes.splice(index, 1);
      Meteor.users.update({_id: user._id}, {$set: {downvotes: downvotes, upvotes: upvotes}});
    } else {
      Meteor.users.update({_id: user._id}, {$set: {downvotes: downvotes}});
    }
    BuildOrders.update({_id: buildOrderId}, {$inc: {score: scoreMod}});
  }
});
