UserSchema = new SimpleSchema({
    username: {
        type: String,
        regEx: /^[a-z0-9A-Z_]{3,15}$/
    },
    emails: {
        type: [Object],
        optional: true
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    favorites: {
      type: [String],
      optional: true
    },
    upvotes: {
      type: [String],
      optional: true
    },
    downvotes: {
      type: [String],
      optional: true
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    style: {
      type: String,
      optional: true
    },
    roles: {
        type: [String],
        optional: true
    },
    isBanned: {
      type: Boolean,
      optional: true
    }
});

Meteor.users.attachSchema(UserSchema);

Meteor.users.before.insert(function (userId, doc) {
  doc.favorites = [];
  doc.upvotes = [];
  doc.downvotes = [];
  doc.roles = [];
});

Meteor.methods({
  toggleFavorite: function(buildOrderId) {
    var contains = function(a, obj) {
      for (var i = 0; i < a.length; i++) {
          if (a[i] === obj) {
              return true;
          }
      }
      return false;
    }
    var user = Meteor.user();
    var favorites = user.favorites;
    if(contains(favorites, buildOrderId)) {
      for(var i = 0; i < favorites.length; i++) {
        if(favorites[i] === buildOrderId) {
          favorites.splice(i, 1);
        }
      }
    } else {
      favorites.push(buildOrderId);
    }
    Meteor.users.update({_id: user._id}, {$set: {favorites: favorites}});
  },
  userToggleStyle: function() {
    var user = Meteor.user();
    if(!user) return;
    if(user.style === "dark") {
      Meteor.users.update({_id: user._id}, {$set: {style: "light"}});
    } else {
      Meteor.users.update({_id: user._id}, {$set: {style: "dark"}});
    }
  },
  banUser: function(_id) {
    var user = Meteor.user();
    if(Roles.userIsInRole(user, ['moderator', 'admin'])) {
      var target = Meteor.users.findOne({_id: _id});
      if(Roles.userIsInRole(target, ['admin'])) {
        throw new Meteor.Error(403, "Admin cannot be banned");
      } else if (Roles.userIsInRole(target, ['moderator'])) {
        if(!Roles.userIsInRole(user, ['admin'])) {
          throw new Meteor.Error(403, "Access denied: not an admin");
        }
      }
      Roles.setUserRoles(_id, []);
      Roles.addUsersToRoles(_id, ['banned']);
    } else {
      throw new Meteor.Error(403, "Access denied");
    }
  },
  unbanUser: function(_id) {
    var user = Meteor.user();
    if(Roles.userIsInRole(user, ['moderator', 'admin'])) {
      Roles.setUserRoles(_id, []);
    } else {
      throw new Meteor.Error(403, "Access denied: not an admin");
    }
  }
});
