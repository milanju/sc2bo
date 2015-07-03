Template.editBo.helpers({
  'buildOrderObject': function() {
    return BuildOrders.findOne({_id: Session.get("activeBo")});
  },
  'getBuildOrder': function() {
    function compare(a, b) {
      a.time = String(a.time).replace(':', '.');
      b.time = String(b.time).replace(':', '.');
      console.log(a.time);
      console.log(b.time);
      return a.time - b.time;
    }
    var buildOrder = BuildOrders.findOne({_id: Session.get("activeBo")}).buildOrder;
    return buildOrder.sort(compare);
  }
});

Template.editBo.events({
  'submit #add-new-command': function(event) {
    console.log("trigger");
    var activeBo = BuildOrders.findOne({_id: Session.get("activeBo")});
    var buildOrder = activeBo.buildOrder;
    var time = event.target.time.value;
    var supply = event.target.supply.value;
    var command = event.target.command.value;

    buildOrder.push({time: time, supply: supply, command: command});
    BuildOrders.update({_id: Session.get("activeBo")}, {$set: {buildOrder: buildOrder}});

    event.target.time.value = "";
    event.target.supply.value = "";
    event.target.command.value= "";
    return false;
  }
});
