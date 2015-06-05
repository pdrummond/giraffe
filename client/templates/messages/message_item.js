Template.messageItem.events({
  "click #archived-check": function () {
    Meteor.call('messageUpdateArchivedField', this._id, !this.archived, function(error, result) {
      if (error) {
        return alert(error.reason);
      }
    });
  },
  'click .message-created-at': function() {
    Router.go("messagePage", {"_id": this._id});
  }
});

Template.messageItem.helpers({
  isOwner: function() {
    return this.ownerId == Meteor.userId();
  },
});
