playerClock = function() {
  if(Session.get("playerStatus") === "play"){
    Session.set("playerTime", Session.get("playerTime")+1);
    console.log(Session.get("playerTime"));
  }
};

Template.editBo.created = function() {
  var bo = BuildOrders.findOne({_id: Session.get("activeBo")});
  Session.set("last", {command: "none"});
  Session.set("actual", {command: "none"});
  if(bo.buildOrder[0]) Session.set("next", {command: bo.buildOrder[0].command});
  if(bo.timeStrategy === "real") {
    console.log("real");
    Session.set("interval", Meteor.setInterval(playerClock, 1000));
  } else {
    console.log("blizzard");
    Session.set("interval", Meteor.setInterval(playerClock, 714));
  }
};

Template.editBo.helpers({
  'buildOrderObject': function() {
    return BuildOrders.findOne({_id: Session.get("activeBo")});
  },
  'getBuildOrder': function() {
    function compare(a, b) {
      return a.position - b.position;
    }
    var buildOrder = BuildOrders.findOne({_id: Session.get("activeBo")}).buildOrder;
    return buildOrder.sort(compare);
  },
  'last': function() {
    $('.last-command').addClass('animated tada').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
      $('.last-command').removeClass('animated tada');
      });
    return Session.get("last");
  },
  'actual': function() {
    $('.actual-command').addClass('animated tada').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
      $('.actual-command').removeClass('animated tada');
      });
    return Session.get("actual");
  },
  'next': function() {
    $('.next-command').addClass('animated tada').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
      $('.next-command').removeClass('animated tada');
      });
    return Session.get("next");
  },
  'timer': function() {
    var pTime = parseInt(Session.get("playerTime"));
    return Math.floor(pTime / 60) + ":" + pTime % 60;
  },
  'clClass': function() {
    getBo = function() {
      function compare(a, b) {
        return a.position - b.position;
      }
      var buildOrder = BuildOrders.findOne({_id: Session.get("activeBo")}).buildOrder;
      return buildOrder.sort(compare);
    };

    var buildOrder = getBo();
    var closest = 100000;
    var playerTime = Session.get("playerTime");
    var difference;
    var closestTime = 0;
    console.log("hello");
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
      if(buildOrder[closestCount-1]) Session.set("last", buildOrder[closestCount-1]);
      Session.set("actual", buildOrder[closestCount]);
      Session.set("next", buildOrder[closestCount+1]);
      return 'tr-actual';
    } else {
      return "";
    }
  },
  'convertedTime': function() {
    return Math.floor(this.time / 60) + ":" + this.time % 60;
  }
});

Template.editBo.events({
  'submit #add-new-command': function(event) {
    console.log("trigger");
    var activeBo = BuildOrders.findOne({_id: Session.get("activeBo")});
    var buildOrder = activeBo.buildOrder;
    var timeArray = event.target.time.value.split(":");
    var supply = event.target.supply.value;
    var command = event.target.command.value;
    var _id = Random.id();
    var time = (parseInt(timeArray[0]) * 60) + parseInt(timeArray[1]);
    var position;
    if(buildOrder[0]) {
      position = buildOrder[buildOrder.length - 1].position + 1;
    } else {
      position = 0;
    }
    buildOrder.push({_id: _id, time: time, supply: supply, command: command, position: position});
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
    var bo = BuildOrders.findOne({_id: Session.get("activeBo")}).buildOrder;

    Session.set("playerTime", 0);
    Session.set("playerStatus", "pause");
    Session.set("last", {command: "none"});
    Session.set("actual", {command: "none"});
    if(bo[0]) Session.set("next", {command: bo[0].command});
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
  },
  'click .move-up': function(event) {
    function compare(a, b) {
      return a.position - b.position;
    }
    var buildOrder = BuildOrders.findOne({_id: Session.get("activeBo")});
    var buildOrderArray = buildOrder.buildOrder;
    for(var i = buildOrderArray.length - 1; i >= 0; i--) {
      if((i != 0) && (buildOrderArray[i]._id === this._id)){
        console.log("move " + i + " to " + (i-1));
        buildOrderArray[i].position = buildOrderArray[i].position - 1;
        buildOrderArray[i-1].position = buildOrderArray[i-1].position + 1;
      }
    }
    buildOrderArray = buildOrderArray.sort(compare);
    BuildOrders.update({_id: Session.get("activeBo")}, {$set: {buildOrder: buildOrderArray}});
  },
  'click .move-down': function(event) {
    function compare(a, b) {
      return a.position - b.position;
    }
    var buildOrder = BuildOrders.findOne({_id: Session.get("activeBo")});
    var buildOrderArray = buildOrder.buildOrder;
    for(var i = buildOrderArray.length - 1; i >= 0; i--) {
      if((buildOrderArray[i] != buildOrderArray.length - 1) &&(buildOrderArray[i]._id === this._id)){
        console.log("move " + i + " to " + (i+1));
        buildOrderArray[i].position = buildOrderArray[i].position + 1;
        buildOrderArray[i+1].position = buildOrderArray[i+1].position - 1;
      }
    }
    buildOrderArray = buildOrderArray.sort(compare);
    BuildOrders.update({_id: Session.get("activeBo")}, {$set: {buildOrder: buildOrderArray}});
  }
});
