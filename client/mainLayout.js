Template.mainLayout.onRendered(function() {
  $(".button-collapse").sideNav();
});

Template.mainLayout.events({
  'click .side-nav a': function() {
    $('.button-collapse').sideNav('hide');
  }
});
