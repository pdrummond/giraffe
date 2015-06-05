Template.messagePage.helpers({
    comments: function() {
      if (Session.get("hideArchived")) {
        return Messages.find({parentMessageId: this._id, archived: {$ne: true}});
      } else {
        return Messages.find({parentMessageId: this._id});
      }
    }
});
Template.messagePage.events({
  'click #edit-button': function(e) {
    var currentMessageId = this._id;
    var content = window.prompt("Enter new content here", this.content);
    if(content != null) {
      Meteor.call("messageUpdateContent", currentMessageId, content, function(error, result) {
        if (error) {
          return alert(error.reason);
        }
      });
    }
  },

  'click #delete-button': function(e) {
    if(window.confirm("Delete this message?")) {
      Meteor.call("messageDelete", this._id, function(error, result) {
        if (error) {
          return alert(error.reason);
        } else {
          Router.go("messagesPage");
        }
      });
    }
  }
});
