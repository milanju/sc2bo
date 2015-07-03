Template.main.helpers({
    "statusSplash": function() {
      if(Session.get("status") === "splash") return true;
      else return false;
    }
  });
