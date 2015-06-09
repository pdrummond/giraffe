Router.configure({
  layoutTemplate: 'layout',
  waitOn: function() { return [
    Meteor.subscribe('channels'),
    Meteor.subscribe('messages', {channelId: Session.get('channelId')})
  ]},
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
