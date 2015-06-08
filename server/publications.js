Meteor.publish('messages', function(options) {
    check(options, Match.Any);
    var jsonQuery = {};

    var filterQuery = "";
    if(options && options.filterQuery) {
        filterQuery = options.filterQuery;
    }
    if(filterQuery.length >= 0) {
      jsonQuery = QueryBuilder.buildFilterQueryJson(filterQuery, jsonQuery);
    }
    return Messages.find(jsonQuery);
});
