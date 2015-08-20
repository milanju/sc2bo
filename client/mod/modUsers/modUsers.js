Template.modUsers.onCreated(function() {
  var instance = this;
  this.subscription = subs.subscribe('allUsers');
});

Template.modUsers.helpers({
  users: function() {
    return Meteor.users.find();
  },
  role: function() {
    var roles = this.roles;
    if(roles.length != 0) {
      var role = "";
      for(var i = 0; i < roles.length; i++) {
        if(i === 0) {
          role += roles[i];
        } else {
          role += ", " + roles[i];
        }
      }
      return role;
    } else {
      return "user";
    }
  },
  banned: function() {
    if(Roles.userIsInRole(this, ['banned'])) return true;
    return false;
  }
});

Template.modUsers.events({
  'click .modUsersBan': function() {
    Meteor.call("banUser", this._id);
    return false;
  },
  'click .modUsersUnban': function() {
    Meteor.call("unbanUser", this._id);
    return false;
  }
});
