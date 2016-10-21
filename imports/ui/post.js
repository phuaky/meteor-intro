import { Template } from 'meteor/templating';

import { Posts } from '../api/posts.js';

import './post.html';

Template.post.onCreated(function () {
  this.editMode = new ReactiveVar(false)
});

Template.post.helpers({
  editMode() {
    return Template.instance().editMode.get();
  }
});

Template.post.events({
  'click .show-edit-form'(event, template) {
    template.editMode.set(!template.editMode.get())
  },

  'submit .update'(event, template) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    Meteor.call('posts.update', this._id, text);
    // // Update a task into the collection
    // Posts.update(this._id, {
    //   text,
    //   owner: this.owner,
    //   username: this.username,
    //   createdAt: this.createdAt,
    //   updatedAt: new Date(), // current time
    // });

    // Closes the edit form
    template.editMode.set(!template.editMode.get())
  },
  'click .delete'() {
    Meteor.call('posts.remove', this._id);   },
});
