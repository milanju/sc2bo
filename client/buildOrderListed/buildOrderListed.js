Template.buildOrderListed.onRendered(function() {
  $('.tooltipped').tooltip({delay: 50});
});

Template.buildOrderListed.helpers({
  'upvoted': function() {
    if(!Meteor.user()) return;
    var upvotes = Meteor.user().upvotes;
    for(var i = 0; i < upvotes.length; i++) {
      if(upvotes[i] === this._id) return "upvoted";
    }
    return "";
  },
  'downvoted': function() {
    if(!Meteor.user()) return;
    var downvotes = Meteor.user().downvotes;
    for(var i = 0; i < downvotes.length; i++) {
      if(downvotes[i] === this._id) return "downvoted";
    }
    return "";
  },
  'unlisted': function() {
    if(this.privacy === "unlisted") return true;
    return false;
  },
  'private': function() {
    if(this.privacy === "private") return true;
    return false;
  },
  'deleted': function() {
    if(this.published === "deleted") return true;
    return false;
  }
});

Template.buildOrderListed.events({
  'click .upvote': function() {
    if(!Meteor.user()) return;
    Meteor.call("upvote", this._id);
  },
  'click .downvote': function() {
    if(!Meteor.user()) return;
    Meteor.call("downvote", this._id);
  }
});
