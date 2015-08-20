Template.favoriteButton.helpers({
  'favoriteClass': function() {
    var contains = function(a, obj) {
      for (var i = 0; i < a.length; i++) {
          if (a[i] === obj) {
              return true;
          }
      }
      return false;
    }
    if(contains(Meteor.user().favorites, this._id)) {
      return "favorite";
    } else {
      return false;
    }
  }
});

Template.favoriteButton.events({
  'click .favorite-button': function() {
    Meteor.call("toggleFavorite", this._id);
    return false;
  }
});
