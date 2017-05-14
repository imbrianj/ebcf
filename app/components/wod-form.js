import Ember from 'ember';

const {
  computed,
  inject: {
    service,
  },
  isEqual,
  get,
  set,
  run,
  typeOf,
  $,
  Component,
  RSVP,
} = Ember;

export default Component.extend({
  showTagDropdown: false,
  bulkTagging: false,
  store: service(),

  tagsByLength: computed('allTags.[]', function() {
    return get(this, 'allTags').sortBy('value.length').reverse();
  }),

  _addTagToWod(tag) {
    let wod = get(this, 'wod');
    let wodTags = get(wod, 'tags');
    let newTags = _.union(wodTags.toArray(), [tag]);
    set(wod, 'tags', newTags);
  },

  _createNewTag(value) {
    let store = get(this, 'store');

    let newTag = {};

    if (get(this, 'type') === 'wod') {
      newTag = store.createRecord('tag', {
        value,
      });
    } else {
      newTag = store.createRecord('bootcamp-tag', {
        value,
      });
    }

    return newTag.save()
      .then((tag) => {
        return tag;
      });
  },

  _addNumberTag(wod) {
    let tags = get(this, 'allTags');
    let regExp = /[0-9]+/;

    let wodTags = tags.filter((tag) => {
      return get(tag, 'value').toLowerCase().includes('wod-');
    });

    let tagNumber = wodTags.map((tag) => {
      return parseInt(regExp.exec(get(tag, 'value'))[0]);
    });

    tagNumber.sort((a, b) => {
      return a - b;
    });

    let largestNumber = tagNumber[tagNumber.length - 1];

    this._createNewTag(`wod-${largestNumber + 1}`)
      .then((tag) => {
        tag.get('wods').pushObject(wod);
      });
  },

  actions: {
    saveWod() {
      this.sendAction('submitForm');
    },

    triggerTagDropdown() {
      set(this, 'showTagDropdown', true);
      run.scheduleOnce('afterRender', () => {
        $('.tag-dropdown').dropdown('show');
        $('.tag-dropdown input').focus();
      });
    },

    selectTag(addedValue) {
      let promise = RSVP.resolve(addedValue);

      if (isEqual(typeOf(addedValue), 'string')) { // If a new set is entered, the addedValue will be the string value they entered
        // Semantic UI does not give us a way to have case insensitive search :(
        // We must check to see if the value entered matches an existing set.
        let tags = get(this, 'allTags');
        let tag = tags.find((tag) => get(tag, 'value').toLowerCase() === addedValue.toLowerCase());

        if (!tag) {
          promise = promise.then(() => {
            return this._createNewTag(addedValue);
          });
        } else {
          promise = RSVP.resolve(tag);
        }
      }

      promise.then((tag) => this._addTagToWod(tag))
        .then(() => {
          run.scheduleOnce('afterRender', () => {
            set(this, 'showTagDropdown', false);
          });
        });
    },

    removeTagFromWod(tag) {
      let wod = get(this, 'wod');
      let wodTags = wod.get('tags');
      let newTags = _.without(wodTags.toArray(), tag);
      set(wod, 'tags', newTags);

      let tagWods = get(tag, 'wods');
      let newWods = _.without(tagWods.toArray(), wod);
      set(tag, 'wods', newWods);
      tag.save();
    },

    autoTagWods() {
      set(this, 'bulkTagging', true);
      let wod = get(this, 'wod');

      let strength = (get(wod, 'strength') || '').toLowerCase().dasherize();
      let conditioning = (get(wod, 'conditioning') || '').toLowerCase().dasherize();

      let possibleTags = get(this, 'tagsByLength').filter((tag) => {
        let tagValue = get(tag, 'value').toLowerCase().dasherize();

        if (strength.includes(tagValue) || conditioning.includes(tagValue)) {
          let regExp = new RegExp(tagValue, 'g');
          strength = strength.replace(regExp, '');
          conditioning = conditioning.replace(regExp, '');
          return true;
        }
      });

      this._addNumberTag(wod);

      possibleTags.forEach((tag) => {
        tag.get('wods').pushObject(wod);
      });
      set(this, 'bulkTagging', false);
    },
  },
});
