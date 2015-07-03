Template.newBo.events({
  "submit #new-bo-form": function (event) {
    var name = event.target.children[0].value;
    var description = event.target.children[1].value;

    BuildOrders.insert({
      name: name,
      description: description,
      buildOrder: []
    })

    Session.set("status", "editBo");
    return false;
  }
});
