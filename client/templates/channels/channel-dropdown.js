Template.channelDropdown.helpers({
  channels: function () {
        return Channels.find();
  },

  channelIcon: function() {
    return Session.get('channelId') == null ? "uk-icon-home" : "uk-icon-desktop";
  },

  channelName: function() {
    return Session.get('channelId') == null ? "Home" : Channels.findOne(Session.get('channelId')).channelName;
  }
});

Template.channelDropdown.events({

  'click #home-channel': function(e) {
      e.preventDefault();
      Session.setPersistent('channelId', null);
  },

  'click #create-channel': function (e) {
    e.preventDefault();
    var channelName = window.prompt("Enter a channel name:");
    if(channelName != null) {
      Meteor.call('channelInsert', channelName);
    }
  },

  'click #rename-channel': function (e) {
    e.preventDefault();
    var channelId = Session.get("channelId");
    if(channelId != null) {
      var channelName = window.prompt("Enter new channel name:", Channels.findOne(channelId).channelName);
      if(channelName != null) {
        Meteor.call('channelRename', channelId, channelName, function(error, result) {
          if (error) {
            return alert(error.reason);
          }
        });
      }
    }
  },

  'click #delete-channel': function(e) {
    e.preventDefault();
    var channelId = Session.get("channelId");
    if(channelId != null) {
      Meteor.call('channelDelete', channelId, function(error, result) {
        if (error) {
          return alert(error.reason);
        } else {
          Session.set("channelId", null);
        }
      });
    }
  }
});


Template.channelItem.events({
    'click .item': function (e) {
      e.preventDefault();
      Session.setPersistent('channelId', this._id);
    }
});
