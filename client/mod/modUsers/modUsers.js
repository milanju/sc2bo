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
  editable: function() {
    var user = Meteor.user();
    var target = this;
    if(Roles.userIsInRole(this, ['admin'])) return false;
    if(Roles.userIsInRole(this, ['moderator']) && !Roles.userIsInRole(user, ['admin'])) return false;
    return true;
  },
  editing: function() {
    if(Session.get("mod-edit-" + this._id) === true) return true;
    return false;
  },
  banned: function() {
    if(Roles.userIsInRole(this, ['banned'])) return true;
    return false;
  },
  editingClass: function() {
    if(Session.get("mod-edit-" + this._id) === true) return "active-edit";
  },
  validRoleSwitch: function() {
    if(Roles.userIsInRole(this, ['banned', 'admin'])) return false;
    var user = Meteor.user();
    if(Roles.userIsInRole(user, ['admin'])) return true;
    return false;
  },
  activeRole: function(role) {
    if(Roles.userIsInRole(this, [role])) return "selected";
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
  },
  'click .modUsersEdit': function() {
    Session.set("mod-edit-" + this._id, true);
    return false;
  },
  'click .modUsersCancel': function() {
    Session.set("mod-edit-" + this._id, false);
    return false;
  },
  'click .modUsersSave': function(event, template) {
    var username = $('#' + this._id + '-username')[0].value;
    var role = $('#' + this._id + '-role')[0];
    if(role) role = $('#' + this._id + '-role')[0].value;
    Meteor.call("updateUser", this._id, username, role);
    Session.set("mod-edit-" + this._id, false);
    return false;
  }
});
