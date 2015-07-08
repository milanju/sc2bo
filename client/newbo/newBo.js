Template.newBo.events({
  "submit #new-bo-form": function (event) {
    console.log(event);
    var name = event.target.elements[0].value;
    var description = event.target.elements[1].value;
    var timeStrategy;

    if(event.target.elements[2].checked === true) {
      timeStrategy = "blizzard";
    } else {
      timeStrategy = "real";
    }

    var boId = BuildOrders.insert({
      name: name,
      description: description,
      userId: Meteor.user()._id,
      timeStrategy: timeStrategy,
      buildOrder: []
    });
    Session.set("activeBo", boId);
    Session.set("status", "editBo");
    return false;
  }
});
