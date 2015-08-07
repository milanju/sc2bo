Template.buildOrderEdit.helpers({
  buildOrder: function() {
    return BuildOrders.findOne({slug: FlowRouter.current().params.slug});
  },
  buildOrderSteps: function() {
    function compare(a,b) {
      if(a.position < b.position)
        return -1;
      if(a.position > b.position)
        return 1;
      return 0;
    }
    return this.bo.sort(compare);
  },
  privacySelected: function(priv) {
    if(this.privacy === priv) return "selected";
  },
  matchupSelected: function(match) {
    if(this.matchup === match) return "selected";
  },
  expansionSelected: function(exp) {
    if(this.expansion === exp) return "selected";
  }
})

Template.buildOrderEdit.events({
  'submit #edit-bo-add-step': function(event) {
    function getPosition(arr) {
      if(arr.length === 0) return 0;
      var pos = 0;
      for(var i = 0; i < arr.length; i++) {
        if(arr[i].position > pos) {
          pos = arr[i].position;
        }
      }
      return pos+1;
    }
    var supply = event.target.elements[0].value;
    if(supply === "") supply = "->";
    var action = event.target.elements[1].value;
    var newBo = this.bo;
    var position = getPosition(newBo);
    var step = {supply: supply, action: action, position: position};
    newBo.push(step);
    BuildOrders.update({_id: this._id}, {$set: {bo: newBo}});

    event.target.elements[0].value = "";
    event.target.elements[1].value = "";
    return false;
  },
  'click #edit-bo-submit': function(event) {
    var privacy = $("#edit-bo-privacy")[0].value;
    var matchup = $("#edit-bo-matchup")[0].value;
    var expansion = $("#edit-bo-expansion")[0].value;
    var title = $("#edit-bo-title")[0].value;
    var description = $("#edit-bo-description")[0].value;
    var _id = this._id;
    BuildOrders.update({_id: this._id}, {$set: {
      published: true,
      privacy: privacy,
      matchup: matchup,
      expansion: expansion,
      title: title,
      description: description
    }}, function(err, res) {
      if(res) {
        Meteor.call('getBoSlug', _id, function(error, result) {
          if(result) {
            FlowRouter.go("/bo/" + result);
          }
        });
      }
    });
    return false;
  },
  'click #edit-bo-delete': function(event) {
    BuildOrders.remove(this._id, function(err, res) {
      if(res) {
        FlowRouter.go("/dashboard");
      }
    });
  },
  'click .delete-step': function(event, template) {
    var buildOrder = BuildOrders.findOne({slug: FlowRouter.current().params.slug});
    var bo = buildOrder.bo;
    var index;
    // Find position of element to be deleted & adjust positions of higher elements
    for(var i = 0; i < bo.length; i++) {
      if(bo[i].position === this.position) {
        index = i;
        mode = "reduce";
      }
    }
    for(var i = 0; i < bo.length; i++) {
      if(bo[i].position > this.position) {
        bo[i].position--;
      }
    }
    bo.splice(index, 1);
    BuildOrders.update({_id: buildOrder._id}, {$set: {bo: bo}});
  },
  'click .move-up-step': function(event, template) {
    if(this.position === 0) return;
    var buildOrder = BuildOrders.findOne({slug: FlowRouter.current().params.slug});
    var bo = buildOrder.bo;
    var current;
    var swap;
    for(var i = 0; i < bo.length; i++) {
      if(bo[i].position === this.position) {
        current = i;
      }
    }
    for(var i = 0; i < bo.length; i++) {
      if(bo[i].position === this.position-1) {
        swap = i;
      }
    }
    bo[current].position -= 1;
    bo[swap].position += 1;
    BuildOrders.update({_id: buildOrder._id}, {$set: {bo: bo}});
  },
  'click .move-down-step': function(event, template) {
    var buildOrder = BuildOrders.findOne({slug: FlowRouter.current().params.slug});
    var bo = buildOrder.bo;
    if(this.position === bo.length-1) return;
    var current;
    var swap;
    for(var i = 0; i < bo.length; i++) {
      if(bo[i].position === this.position) {
        var current = i;
      }
    }
    for(var i = 0; i < bo.length; i++) {
      if(bo[i].position === this.position+1) {
        var swap = i;
      }
    }
    bo[current].position += 1;
    bo[swap].position -= 1;
    BuildOrders.update({_id: buildOrder._id}, {$set: {bo: bo}});
  }
});
