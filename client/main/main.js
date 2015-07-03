Template.main.helpers({
    'statusSplash': function() {
      if(Session.get("status") === "splash") return true;
      else return false;
    },
    'statusNewBo': function() {
      if(Session.get("status") === "newBo") return true;
      else return false;
    },
    'statusEditBo': function() {
      if(Session.get("status") === "editBo") return true;
      else return false;
    }
  });

Template.main.events({
  'click .new-buildorder': function () {
    Session.set("status", "newBo");
  }
});
