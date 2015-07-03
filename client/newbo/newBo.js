Template.newBo.events({
  "submit #new-bo-form": function (event) {
    var name = event.target.children[0].value;
    var description = event.target.children[1].value;

    var boId = BuildOrders.insert({
      name: name,
      description: description,
      buildOrder: []
    });
    Session.set("activeBo", boId);
    Session.set("status", "editBo");
    return false;
  }
});
