Template.messageItem.events({
  "click #archived-check": function () {
    Meteor.call('messageUpdateArchivedField', this._id, !this.archived, function(error, result) {
      if (error) {
        return alert(error.reason);
      }
    });
  },
  'click .message-link': function() {
    Router.go("messagePage", {"_id": this._id});
  }
});

Template.messageItem.helpers({
    getMessageTemplate: function() {
        console.log("template: " + this.messageType);
        return this.messageType;
    },
      isOwner: function() {
        return this.ownerId == Meteor.userId();
      },
      commentsCount: function() {
          return Messages.find({parentMessageId: this._id}).count();
      }
});
