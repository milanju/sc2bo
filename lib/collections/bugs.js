Bugs = new Mongo.Collection("bugs");

BugsSchema = new SimpleSchema({
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
  solved: {
    type: Boolean
  }
});

Bugs.attachSchema(BugsSchema);

Meteor.methods({
  createBug: function(content) {
    var user = Meteor.user();
    if(user) {
      Bugs.insert({
        createdAt: new Date(),
        userId: user._id,
        userName: user.username,
        content: content,
        solved: false
      }, function(err, res) {
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
  deleteBug: function(bugId) {
    var user = Meteor.user();
    if(Roles.userIsInRole(user, ['admin'])) {
      Bugs.remove({_id: bugId}, function(err, res) {
        if(err) {
          throw new Meteor.Error(403, err.message);
        }
      })
    } else {
      throw new Meteor.Error(403, "Access denied");
    }
  },
  closeBug: function(bugId) {
    var user = Meteor.user();
    if(Roles.userIsInRole(user, ['admin'])) {
      Bugs.update({_id: bugId}, {$set: {solved: true}}, function(err, res) {
        if(err) {
          if(Meteor.isServer) {
            throw new Meteor.Error(403, err.message);
          }
        }
      });
    }
  },
  openBug: function(bugId) {
    var user = Meteor.user();
    if(Roles.userIsInRole(user, ['admin'])) {
      Bugs.update({_id: bugId}, {$set: {solved: false}}, function(err, res) {
        if(err) {
          if(Meteor.isServer) {
            throw new Meteor.Error(403, err.message);
          }
        }
      });
    }
  }
});
