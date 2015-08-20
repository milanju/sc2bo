Accounts.validateLoginAttempt(function(info) {
  var user = info.user;
  if(Roles.userIsInRole(user, ['banned'])) throw new Meteor.Error(403, 'You are banned');
  return true;
});
