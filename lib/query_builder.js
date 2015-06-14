
QueryBuilder = {

  buildFilterQueryJson: function(filterQuery, jsonQuery) {
    if(filterQuery.indexOf("doable:true") != -1) {
        jsonQuery.doable = true;
    }
    var regex = /status:'(.*)'/g;
    var match = regex.exec(filterQuery);    
    if(match && match.length > 1) {
        jsonQuery.status = match[1];
    }
    return jsonQuery;
  }
}
