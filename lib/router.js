Router.configure({
  layoutTemplate: 'layout',
  waitOn: function() { return Meteor.subscribe('messages'); },
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
});

Router.route('/', {name: 'messagesPage'});
Router.route('/messages/:_id', {
  name: 'messagePage',
  data: function() { return Messages.findOne(this.params._id); }
});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction('dataNotFound', {only: 'messagePage'});
Router.onBeforeAction(requireLogin, {only: 'messagePage'});
