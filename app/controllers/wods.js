import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['tag'],
  tag: null,
  date: null,
  filterTags: Ember.observer('tag', function() {
    var tagValue = this.get('tag');
    var _this = this;
    this.store.query('tag', {
      filter: {
        simple: {
          value: tagValue
        }
      }
    }).then(function(tags){
      if(tags){
        var tag = tags.get('firstObject');
        $('.dropdown').dropdown('set selected', tag.get('value'));
        _this.send('searchInputChanged', tag.get('id'), tag.get('value'));
      }
    });

  }),
  sortProps: ['date:desc'],
  wods2: Ember.computed.sort('wods', 'sortProps'),
  dateDepth: 1,
  searching: false,
  wodsFound: Ember.computed('wods.length', function() {
    var numberOfWods = this.get('wods').get('length');
    var searching = this.get('searching');

    var res = "";
    if (numberOfWods === 1) {
      res =  numberOfWods + " Wod Found for ";
    } else {
      res = numberOfWods + " Wods Found for ";
    }

    if (moment(searching).isValid()) {
      res = res + moment(searching).format('ddd MM.DD.YYYY').toUpperCase();
    } else {
      res = res + searching.toUpperCase();
    }
    return res;
  }),
  noResultsFound: Ember.computed('wods.length', function() {
    return (this.get('wods').get('length') < 1);
  }),
  dateChanged: Ember.observer('wodDate', function(){
    this.send('dateInputChanged', this.get('wodDate'));
  }),
  _disableDatePicker: function() {
    $('.datepicker').addClass('disabled');
    $('.clearDate').addClass('disabled');
  },
  _disableTagPicker: function() {
    $('.dropdown').addClass('disabled');
    $('.clearTags').addClass('disabled');
  },
  _enableDataPicker: function() {
    $('.datepicker').removeClass('disabled');
    $('.clearDate').removeClass('disabled');
  },
  _enableTagPicker: function() {
    $('.dropdown').removeClass('disabled');
    $('.clearTags').removeClass('disabled');
  },
  actions: {
    searchInputChanged(tagId, value) {
      this._disableDatePicker();
      this.set('searching', value);
      // this.set('tag', value);
      var _this = this;

      // $('.wod-list').dimmer('show');

      if (tagId) {
        this.store.findRecord('tag', tagId).then(function(tag) {
          tag.get('wods').then(function(wods){
            // $('.wod-list').dimmer('hide');
            _this.set('wods', wods);
          });
        });
      // }
      } else {
        var dateDepth = this.get('dateDepth');
        var weeksAgo = moment().day(-7 * dateDepth).toDate();
        this.store.query('wod', {
          filter: {
            simple: {
              date: {
                $gt: weeksAgo
              }
            }
          }
        }).then(function(wods){
          // $('.wod-list').dimmer('hide');
          _this.set('wods', wods);
        });
      }
    },
    clearTags() {
      $('.dropdown').dropdown('clear');
      this._enableDataPicker();
      this.set('searching', false);
      this.set('tag', null);
    },
    dateInputChanged(date) {
      if (date) {
        this._disableTagPicker();
        this.set('searching', date);
        var day = moment(date).utc().startOf('day').toISOString();
        var filteredWods = this.store.query('wod', {
          filter: {
            simple: {
              date: day
            }
          }
        });

        this.set('wods', filteredWods);
      } else {
        var dateDepth = this.get('dateDepth');
        var weeksAgo = moment().day(-7 * dateDepth).toDate();
        var wods = this.store.query('wod', {
          filter: {
            simple: {
              date: {
                $gt: weeksAgo
              }
            }
          }
        });
        this.set('wods', wods);
      }
    },
    clearDate() {
      this.set('searching', false);
      this.set('wodDate', '');
      this._enableTagPicker();
    },
    getOlder() {
      var _this = this;
      var dateDepth = this.get('dateDepth') + 1;
      var weeksAgo = moment().day(-7 * dateDepth).toDate();

      $('.older').addClass('loading');

      setTimeout(function(){
        _this.store.query('wod', {
          filter: {
            simple: {
              date: {
                $gt: weeksAgo
              }
            }
          }
        }).then(function(wods){
          $('.older').removeClass('loading');

          _this.set('wods', wods);
          _this.set('dateDepth', dateDepth);
        });
      }, 400);
    },
    // tagsEntered: function(component, id, value) {
    //   this.send('searchInputChanged', id);
    // }
  }
});
