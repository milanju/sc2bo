playerClock = function() {
  if(Session.get("playerStatus") === "play"){
    Session.set("playerTime", Session.get("playerTime")+1);
    console.log(Session.get("playerTime"));
  }
};

Template.editBo.created = function() {
  Meteor.setInterval(playerClock, 1000);
};

Template.editBo.helpers({
  'buildOrderObject': function() {
    return BuildOrders.findOne({_id: Session.get("activeBo")});
  },
  'getBuildOrder': function() {
    function compare(a, b) {
      a.time = String(a.time).replace(':', '.');
      b.time = String(b.time).replace(':', '.');
      return a.time - b.time;
    }
    var buildOrder = BuildOrders.findOne({_id: Session.get("activeBo")}).buildOrder;
    return buildOrder.sort(compare);
  },
  'last': function() {
    return Session.get("last");
  },
  'actual': function() {
    return Session.get("actual");
  },
  'next': function() {
    return Session.get("next");
  },
  'timer': function() {
    return Session.get("playerTime");
  },
  'tdSize': function() {
    getBo = function() {
      function compare(a, b) {
        a.time = String(a.time).replace(':', '.');
        b.time = String(b.time).replace(':', '.');
        return a.time - b.time;
      }
      var buildOrder = BuildOrders.findOne({_id: Session.get("activeBo")}).buildOrder;
      return buildOrder.sort(compare);
    };

    var buildOrder = getBo();
    var closest = 100000;
    var playerTime = Session.get("playerTime");
    var difference;
    var closestTime = 0;
    for (var i = 0; i < buildOrder.length; i++) {
      difference = playerTime - buildOrder[i].time;
      if(difference < 0) difference = -difference;
      if(difference <= closest && buildOrder[i].time <= playerTime) {
        closest = difference;
        closestCount = i;
        closestTime = buildOrder[i].time;
      }
    }
    if(this.time === closestTime) {
      Session.set("last", buildOrder[closestCount-1]);
      Session.set("actual", buildOrder[closestCount]);
      Session.set("next", buildOrder[closestCount+1]);
      return 'td-big';
    } else {
      return "";
    }
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
    var _id = Random.id();

    buildOrder.push({_id: _id, time: time, supply: supply, command: command});
    BuildOrders.update({_id: Session.get("activeBo")}, {$set: {buildOrder: buildOrder}});

    event.target.time.value = "";
    event.target.supply.value = "";
    event.target.command.value= "";
    return false;
  },
  'click #play-bo': function(event) {
    Session.set("playerStatus", "play");
    console.log("play");
  },
  'click #pause-bo': function(event) {
    Session.set("playerStatus", "pause");
    console.log("pause");
  },
  'click #stop-bo': function(event) {
    Session.set("playerTime", 0);
    Session.set("playerStatus", "pause");
    console.log("stop");
  },
  'click .remove-command': function(event) {
    var buildOrder = BuildOrders.findOne({_id: Session.get("activeBo")});
    var buildOrderArray = buildOrder.buildOrder;
    console.log(buildOrderArray);
    for(var i = buildOrderArray.length -1; i >= 0; i--) {
      if(buildOrderArray[i]._id === this._id){
        buildOrderArray.splice(i, 1);
        //console.log(buildOrderArray[i]._id + " //// " + this._id);
      }
    }
    BuildOrders.update({_id: Session.get("activeBo")}, {$set: {buildOrder: buildOrderArray}});
  }
});
