Meteor.publish('messages', function(options) {
    check(options, Match.Any);
    var jsonQuery = {};

    if(options && options.channelId) {
      jsonQuery.channelId = options.channelId;
    }

    var filterQuery = "";
    if(options && options.filterQuery) {
        filterQuery = options.filterQuery;
    }
    if(filterQuery.length >= 0) {
      jsonQuery = QueryBuilder.buildFilterQueryJson(filterQuery, jsonQuery);
    }
    return Messages.find(jsonQuery);
});

Meteor.publish('channels', function () {
    return Channels.find();
});
