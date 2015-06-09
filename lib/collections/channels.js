Channels = new Mongo.Collection("channels");

Meteor.methods({
  channelInsert: function(channelName) {
    check(Meteor.userId(), String);
    check(channelName, String);
    var user = Meteor.user();
    var channel = {
      channelName: channelName,
      ownerId: user._id,
      createdBy: user._id,
      createdAt: new Date().getTime(),
    };
    var channelId = Channels.insert(channel);
    return {
      _id: channelId
    };
  },

  channelRename: function(channelId, channelName) {
    check(channelId, String);
    check(channelName, String);
    var existingChannel = Channels.findOne(channelId);
    if(Meteor.userId() !== existingChannel.ownerId) {
      throw new Meteor.Error(
        "not-authorised",
        "You do not have permission to rename this channel"
      );
    }
    var user = Meteor.user();
    var channel = _.extend(existingChannel, {
      channelName: channelName,
      updatedBy: user._id,
      updatedAt: new Date().getTime(),
    });
    var channelId = Channels.update(channelId, channel);
    return {
      _id: channelId
    };
  },

  channelDelete: function(channelId) {
    check(channelId, String);
    var existingChannel = Channels.findOne(channelId);
    if(Meteor.userId() !== existingChannel.ownerId) {
      throw new Meteor.Error(
        "not-authorised",
        "You do not have permission to delete this channel"
      );
    }
    Channels.remove(channelId);
  }
});
