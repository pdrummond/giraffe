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
    },

    showChannelBadge: function() {
      return Session.get('channelId') == null && this.channelId != null;
    },

    channelBadgeName: function() {
      var name = "";
      if(Session.get('channelId') == null) {
        name = this.channelId ==null ? "Home" : Channels.findOne(this.channelId).channelName;
      }
      return name;
    }
});
