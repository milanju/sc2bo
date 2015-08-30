Template.pickRace.events({
  'click .pick-protoss': function() {
    if(Meteor.user()) {
      Meteor.call('setRace', 'protoss');
    } else {
      Session.set('player-race', 'protoss');
    }
  },
  'click .pick-terran': function() {
    if(Meteor.user()) {
      Meteor.call('setRace', 'terran');
    } else {
      Session.set('player-race', 'terran');
    }
  },
  'click .pick-zerg': function() {
    if(Meteor.user()) {
      Meteor.call('setRace', 'zerg');
    } else {
      Session.set('player-race', 'zerg');
    }
  },
  'click .intro-register': function() {
    $('#loginModal').closeModal();
    $('#registerModal').openModal();
    setTimeout(function() {
      $('#register-username').focus();
    }, 100);
    return false;
  }
});
