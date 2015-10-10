/* global Songs */

Meteor.publish('songs', () => {
  return Songs.find()
})
