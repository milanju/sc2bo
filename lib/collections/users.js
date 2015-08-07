Schema = {};

Schema.User = new SimpleSchema({
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
    roles: {
        type: Object,
        optional: true,
        blackbox: true
    }
});

Meteor.users.attachSchema(Schema.User);

Meteor.users.before.insert(function (userId, doc) {
  doc.favorites = [];
  doc.upvotes = [];
  doc.downvotes = [];
});

Meteor.methods({
  'toggleFavorite': function(buildOrderId) {
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
  }
});
