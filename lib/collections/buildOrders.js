BuildOrders = new Mongo.Collection("buildOrders");
BuildOrders.friendlySlugs('title');

BuildOrders.before.insert(function (userId, doc) {
  doc.userId = userId;
  doc.createdAt = new Date();
  doc.published = false;
  doc.bo = [];
  doc.score = 0;
});

BuildOrders.allow({
  insert: function(){
    return Meteor.user();
  },
  update: function(userId, doc){
    return userId === doc.userId;
  },
  remove: function(userId, doc){
    return userId === doc.userId;
  }
});

BuildOrders.deny({
  update: function(userId, docs, fields, modifier) {
    return _.contains(fields, 'score')
  }
});

Meteor.methods({
  getBoSlug: function(_id) {
    if(Meteor.isServer) {
      return BuildOrders.findOne(_id).slug;
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
