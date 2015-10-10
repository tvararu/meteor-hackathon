YASS = Yet Another Stupid Spotify

- Music Streaming app
- cross-platform (aka mobile, web, everything)
- streams from: youtube, soundcloud, torrents, plain music files
- runs on your own personal server
- ability to link directly to a song, and play that on any device without signup or anything

- FFT song to get BPM to drive a philips hue lightbulb
- synchronized listening
- synchronized playlists

Database tables:
- users (meteor stuff)
- songs { id: ..., name: "Bonfire", artist: "Knife Party", [year, artwork...], createdAt: new Date(), updatedAt: new Date() }
- playlists { id: ..., userId: ..., name: "My new playlist", songs: [id, id, id, ...], [mood], createdAt: new Date(), updatedAt: new Date() }
- actions { id: ..., userId: ..., type: "play", data: {}, createdAt: new Date() }
- search { id: ..., userId: ..., results: [], createdAt: new Date() }

To build syncing, we need this info:
- song that other person is playing
- the current time
- play/pause state

- see who are your listeners


- Implement Facebook login
- Make a music file play in the browser.
- Make a music file from a torrent stream in the browser.
- Make a search interface to browse torrents/other channels and tell them to stream.
- Ability to share a link for that song.
- Ability to create playlists.


- Ability to listen in sync with your friends.
