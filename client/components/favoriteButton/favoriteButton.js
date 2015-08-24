Template.favoriteButton.helpers({
  'favoriteClass': function() {
    if(Meteor.user()) {
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
    } else {
      return false;
    }
  }
});

Template.favoriteButton.events({
  'click .favorite-button': function() {
    if(Meteor.user()) {
      Meteor.call("toggleFavorite", this._id);
    } else {
      $('#loginModal').openModal();
      setTimeout(function() {
        $('#login-username').focus();
      }, 100);
    }
    return false;
  }
});
