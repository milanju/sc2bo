subs = new SubsManager();

FlowRouter.route('/', {
  name: 'home',
  subscriptions: function(params, queryParams) {
    var limit = 6
    if(queryParams.limit) limit = queryParams.limit;
    //this.register('publicBuildOrders', subs.subscribe('publicBuildOrders', limit));
  },
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {main: "home"});
  }
});


FlowRouter.route('/dashboard', {
  name: 'dashboard',
  subscriptions: function(params) {
    this.register('myBuildOrders', subs.subscribe('myBuildOrders'));
  },
  action: function(params, queryParams) {
      BlazeLayout.render("mainLayout", {main: "dashboard"});
  }
});

FlowRouter.route('/favorites', {
  name: 'favorites',
  subscriptions: function(params) {
    this.register('favoriteBuildOrders', subs.subscribe('favoriteBuildOrders'));
  },
  action: function(params, queryParams) {
      BlazeLayout.render("mainLayout", {main: "favorites"});
  }
});

FlowRouter.route('/login', {
  name: 'login',
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {main: "login"});
  }
});

FlowRouter.route('/register', {
  name: 'register',
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {main: "register"});
  }
});

FlowRouter.route('/feedback', {
  name: 'feedback',
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {main: "feedback"});
  }
});

FlowRouter.route('/bugs', {
  name: 'bugs',
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {main: "bugs"});
  }
});

FlowRouter.route('/bo/new', {
  name: 'bo-new',
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {main: "buildOrderNew"});
  }
});

FlowRouter.route('/bo/:slug', {
  name: 'bo',
  subscriptions: function(params) {
    this.register('buildOrder', subs.subscribe('buildOrder', params.slug));
  },
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {main: "buildOrder"});
  }
});

FlowRouter.route('/bo/:slug/edit', {
  name: 'bo-edit',
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {main: "buildOrderEdit"});
  }
});

FlowRouter.route('/mod', {
  name: 'mod',
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {main: "mod"});
  }
});

FlowRouter.route('/mod/users', {
  name: 'modUsers',
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {main: "modUsers"});
  }
});

FlowRouter.route('/mod/deleted', {
  name: 'modDeleted',
  subscriptions: function(params) {
    this.register('deletedBuildOrders', subs.subscribe('deletedBuildOrders'));
  },
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {main: "modDeleted"});
  }
});

FlowRouter.route('/mod/reports', {
  name: 'modReports',
  subscriptions: function(params) {
    this.register('openReports', subs.subscribe('openReports'));
    this.register('openReportedBos', subs.subscribe('openReportedBos'));
  },
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {main: "modReports"});
  }
});

FlowRouter.route('/admin', {
  name: 'admin',
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {main: "admin"});
  }
});

FlowRouter.route('/admin/feedback', {
  name: 'adminFeedback',
  subscriptions: function(params) {
    this.register('unreadFeedback', subs.subscribe('unreadFeedback'));
  },
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {main: "adminFeedback"});
  }
});

FlowRouter.route('/admin/feedback/read', {
  name: 'adminFeedbackRead',
  subscriptions: function(params) {
    this.register('readFeedback', subs.subscribe('readFeedback'));
  },
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {main: "adminFeedbackRead"});
  }
});

FlowRouter.route('/admin/bugs', {
  name: 'adminBugs',
  subscriptions: function(params) {
    this.register('unsolvedBugs', subs.subscribe('unsolvedBugs'));
  },
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {main: "adminBugs"});
  }
});

FlowRouter.route('/admin/bugs/solved', {
  name: 'adminBugs',
  subscriptions: function(params) {
    this.register('solvedBugs', subs.subscribe('solvedBugs'));
  },
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {main: "adminBugsSolved"});
  }
});

FlowRouter.notFound = {
  name: 'page-not-found',
  action: function() {
    BlazeLayout.render("mainLayout", {main: "pageNotFound"});
  }
};

function hideFooter() {
  $('.footer').hide();
}
