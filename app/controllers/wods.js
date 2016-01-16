import Ember from 'ember';

export default Ember.Controller.extend({
  didChange: Ember.observer('searchedTags', function(){
    this.send('searchInputChanged');
  }),
  dateChanged: Ember.observer('wodDate', function(){
    this.send('dateInputChanged', this.get('wodDate'));
  }),
  actions: {
    searchInputChanged() {
      var tags = this.get('searchedTags');
      if (tags.length > 0) {
        var wods = [];
        tags.forEach(function(tag){
          tag.get('wods').forEach(function(wod){
            wods.pushObject(wod);
          });
        });
        this.set('wods', wods);
      } else {
        this.set('wods', this.store.findAll('wod'));
      }
    },
    dateInputChanged(date) {
      if (date) {
        // var filteredWods = [];
        // this.get('wods').forEach( function(wod){
        //   var wodDate = moment(wod.get('date')).format('LL')
        //   if (wodDate === moment(date).format('LL')){
        //     filteredWods.pushObject(wod);
        //   }
        // });
        // this.set('wods', filteredWods);
        // var filteredWods = this.store.findAll('wod', {date: date});
        var self = this;
        var filtered_wods = this.get('wods').filter(function (wod) {
          return date.valueOf() == wod.get('date').valueOf();
        });
        this.set('wods', filtered_wods);
        // this.store.query('wod', { filter: { date: date } }).then(function(wods){
        //   debugger;
        //   self.set('wods', wods);
        // });
      } else {
        this.set('wods', this.store.findAll('wod'));
      }
    }
  }
});
