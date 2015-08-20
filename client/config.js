Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});

Meteor.startup(function() {
  Session.set("filter-exp-HotS", true);
  Session.set("filter-exp-LotV", false);
  Session.set("filter-exp-WoL", false);
  Session.set("sort-top", true);
  Session.set("sort-new", false);
  Session.set("sort-hot", false);
});
