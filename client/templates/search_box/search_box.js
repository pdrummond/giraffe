
SearchBoxComponent = BlazeComponent.extendComponent({
  template: function() { return 'searchBox'},

  events: function() {
    return [{
      "keydown #search-box-input": this.onKeydown,
    }];
  },

  filterQuery: function() {
    return Session.get('filterQuery');
  },

  onKeydown: function(ev) {
    if(ev.keyCode == 13) {
      ev.preventDefault();
      var filterQuery = $('#search-box-input').val();
      Session.setPersistent('filterQuery', filterQuery);
      Meteor.subscribe('messages', {filterQuery: filterQuery});
    }
  }
}).register('SearchBoxComponent');
