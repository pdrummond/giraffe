
SearchBoxComponent = BlazeComponent.extendComponent({
  template: function() { return 'searchBox'},

  events: function() {
    return [{
      "click .filter-command": this.onFilterCommand,
      "keydown #search-box-input": this.onKeydown,
    }];
  },

  filterQuery: function() {
    return Session.get('filterQuery');
  },

  onFilterCommand: function(e) {
    e.preventDefault();
    var filterQuery = $(e.target).text();
    this.setQuery(filterQuery);
  },

  onKeydown: function(ev) {
    if(ev.keyCode == 13) {
      ev.preventDefault();
      var filterQuery = $('#search-box-input').val();
      this.setQuery(filterQuery);
    }
  },

  setQuery: function(filterQuery) {
    Session.setPersistent('filterQuery', filterQuery);
    Meteor.subscribe('messages', {filterQuery: filterQuery});
  }

}).register('SearchBoxComponent');
