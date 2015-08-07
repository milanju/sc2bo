FlowRouter.route('/', {
    action: function(params, queryParams) {
        BlazeLayout.render("mainLayout", {main: "home"});
    },
    subscriptions: function(params, queryParams) {
      this.register('buildOrders', Meteor.subscribe('buildOrders', {privacy: "public"}));
    }
});

FlowRouter.route('/dashboard', {
    action: function(params, queryParams) {
        BlazeLayout.render("mainLayout", {main: "dashboard"});
    },
    subscriptions: function(params, queryParams) {
      this.register('buildOrders', Meteor.subscribe('buildOrders', {userId: Meteor.userId()}));
    }
});

FlowRouter.route('/favorites', {
    action: function(params, queryParams) {
        BlazeLayout.render("mainLayout", {main: "favorites"});
    },
    subscriptions: function(params, queryParams) {
      if(Meteor.user()) {
        var favorites = Meteor.user().favorites;
        this.register('buildOrders', Meteor.subscribe('buildOrders', {_id: {$in: favorites}}));
      }
    }
});

FlowRouter.route('/bo/new', {
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {main: "buildOrderNew"});
  }
});

FlowRouter.route('/bo/:slug', {
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {main: "buildOrder"});
  },
  subscriptions: function(params, queryParams) {
    this.register('buildOrders', Meteor.subscribe('buildOrders', {slug: params.slug}));
  }
});

FlowRouter.route('/bo/:slug/edit', {
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {main: "buildOrderEdit"});
  },
  subscriptions: function(params, queryParams) {
    this.register('buildOrders', Meteor.subscribe('buildOrders', {slug: params.slug}));
  }
});

FlowRouter.notFound = {
    action: function() {
      BlazeLayout.render("mainLayout", {main: "pageNotFound"});
    }
};
