import Ember from 'ember';

const {
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

  _addTagToWod(tag) {
    let wod = get(this, 'wod');
    let wodTags = get(wod, 'tags');
    let newTags = _.union(wodTags.toArray(), [tag]);
    set(wod, 'tags', newTags);
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
          let store = get(this, 'store');

          let newTag = store.createRecord('tag', {
            value: addedValue,
          });

          promise = promise
            .then(() => newTag.save())
            .then((tag) => {
              return tag;
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
    },

    autoTagWods() {
      set(this, 'bulkTagging', true);
      let wod = get(this, 'wod');

      const strength = (get(wod, 'strength') || '').toLowerCase().dasherize();
      const conditioning = (get(wod, 'conditioning') || '').toLowerCase().dasherize();

      let possibleTags = get(this, 'allTags').filter((tag) => {
        let tagValue = get(tag, 'value').toLowerCase().dasherize();
        return strength.includes(tagValue) || conditioning.includes(tagValue);
      });

      possibleTags.forEach((tag) => {
        tag.get('wods').pushObject(wod);
      });
      set(this, 'bulkTagging', false);
    },
  },
});
