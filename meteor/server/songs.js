/* global Songs */

Meteor.publish('songs', () => {
  return Songs.find()
})

Songs.allow({
  insert: () => true,
  remove: () => true
})

Songs.find().observe({
  added (newSong) {
    console.log(newSong)
    if (!newSong.path) {
      console.log('newSong missing path')
    }
  }
})
