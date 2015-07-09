playerClock = function() {
  if(Session.get("playerStatus") === "play"){
    Session.set("playerTime", Session.get("playerTime")+1);
  }
};

Template.editBo.created = function() {
  var bo = BuildOrders.findOne({_id: Session.get("activeBo")});
  Session.set("last", {command: "none"});
  Session.set("actual", {command: "none"});
  if(bo.buildOrder[0]) Session.set("next", {command: bo.buildOrder[0].command});
  if(bo.timeStrategy === "real") {
    Session.set("interval", Meteor.setInterval(playerClock, 1000)); // Real Time (lotv)
  } else {
    Session.set("interval", Meteor.setInterval(playerClock, 714)); // Blizzard Time (hots)
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
    // animate
    $('.last-command').addClass('animated tada').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
      $('.last-command').removeClass('animated tada');
    });
    return Session.get("last");
  },
  'actual': function() {
    // animate
    $('.actual-command').addClass('animated tada').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
      $('.actual-command').removeClass('animated tada');
    })
    return Session.get("actual");
  },
  'next': function() {
    // animate
    $('.next-command').addClass('animated tada').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
      $('.next-command').removeClass('animated tada');
      });
    return Session.get("next");
  },
  'timer': function() {
    var pTime = parseInt(Session.get("playerTime"));
    var first = Math.floor(pTime / 60);
    var second = pTime % 60;

    if(first < 10) first = "0" + first;
    if(second < 10) second = "0" + second;

    return first + ":" + second;
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
    var first = Math.floor(this.time / 60);
    var second = this.time % 60;
    if(first < 10) first = "0" + first;
    if(second < 10) second = "0" + second;

    return first + ":" + second;
  },
  'gameMode': function() {
    var buildOrder = BuildOrders.findOne({_id: Session.get("activeBo")});
    if(buildOrder.timeStrategy === "real") return "LotV"
    else return "HotS";
  },
  'pRace': function() {
    var buildOrder = BuildOrders.findOne({_id: Session.get("activeBo")});
    return buildOrder.playerRace.charAt(0).toUpperCase() + buildOrder.playerRace.slice(1);
  },
  'oRace': function() {
    var buildOrder = BuildOrders.findOne({_id: Session.get("activeBo")});
    return buildOrder.opponentRace.charAt(0).toUpperCase() + buildOrder.opponentRace.slice(1);
  }
});

Template.editBo.events({
  'submit #add-new-command': function(event) {
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
  },
  'click #pause-bo': function(event) {
    Session.set("playerStatus", "pause");
  },
  'click #stop-bo': function(event) {
    var bo = BuildOrders.findOne({_id: Session.get("activeBo")}).buildOrder;

    Session.set("playerTime", 0);
    Session.set("playerStatus", "pause");
    Session.set("last", {command: "none"});
    Session.set("actual", {command: "none"});
    if(bo[0]) Session.set("next", {command: bo[0].command});
  },
  'click .remove-command': function(event) {
    var buildOrder = BuildOrders.findOne({_id: Session.get("activeBo")});
    var buildOrderArray = buildOrder.buildOrder;
    for(var i = buildOrderArray.length -1; i >= 0; i--) {
      if(buildOrderArray[i]._id === this._id){
        buildOrderArray.splice(i, 1);
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
        buildOrderArray[i].position = buildOrderArray[i].position + 1;
        buildOrderArray[i+1].position = buildOrderArray[i+1].position - 1;
      }
    }
    buildOrderArray = buildOrderArray.sort(compare);
    BuildOrders.update({_id: Session.get("activeBo")}, {$set: {buildOrder: buildOrderArray}});
  }
});
