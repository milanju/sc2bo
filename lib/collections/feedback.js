Feedback = new Mongo.Collection("feedback");

FeedbackSchema = new SimpleSchema({
  createdAt: {
    type: Date
  },
  userId: {
    type: String,
    max: 100
  },
  userName: {
    type: String,
    max: 100
  },
  content: {
    type: String,
    min: 10,
    max: 1000
  },
  readBy: {
    type: [String]
  }
});

Feedback.attachSchema(FeedbackSchema);

Meteor.methods({
  createFeedback: function(content) {
    var user = Meteor.user();
    if(user) {
      var feedback = Feedback.insert({
        createdAt: new Date(),
        userId: user._id,
        userName: user.username,
        content: content,
        readBy: []
      }, function(err, res) {
        if(err) {
          if(Meteor.isServer) {
            throw new Meteor.Error(403, err.message);
          }
        } else {
        }
      });
    } else {
      throw new Meteor.Error(403, "Access denied");
    }
  },
  deleteFeedback: function(feedbackId) {
    var user = Meteor.user();
    if(Roles.userIsInRole(user, ['admin'])) {
      Feedback.remove({_id: feedbackId}, function(err, res) {
        if(err) {
          throw new Meteor.Error(403, err.message);
        }
      });
    } else {
      throw new Meteor.Error(403, "Access denied");
    }
  },
  readFeedback: function(feedbackId) {
    var user = Meteor.user();
    if(Roles.userIsInRole(user, ['admin'])) {
      Feedback.update({_id: feedbackId}, {$push: {readBy: user._id}}, function(err, res) {
        if(err) {
          if(Meteor.isServer) {
            throw new Meteor.Error(403, err.message);
          }
        }
      });
    } else {
      throw new Meteor.Error(403, "Access denied");
    }
  },
  unreadFeedback: function(feedbackId) {
    var user = Meteor.user();
    if(Roles.userIsInRole(user, ['admin'])) {
      Feedback.update({_id: feedbackId}, {$pull: {readBy: user._id}}, function(err, res) {
        if(err) {
          if(Meteor.isServer) {
            throw new Meteor.Error(403, err.message);
          }
        }
      });
    } else {
      throw new Meteor.Error(403, "Access denied");
    }
  }
});
