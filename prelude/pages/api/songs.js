export default (req, res) => {
  switch (req.method) {
    case 'POST':
      handlePost(req, res);
  }
};

function handlePost(req, res) {
  const {artist, data} = JSON.parse(req.body);

  /* 
    JSON files from Spotify are line-delimited and must be comma-delimited for JSON.parse to work
    Consider JSON streaming for potential performance improvements
    https://www.bennadel.com/blog/3233-parsing-and-serializing-large-datasets-using-newline-delimited-json-in-node-js.htm
    https://www.npmjs.com/package/can-ndjson-stream
  */

  const songs = JSON.parse(`[${data.replace(/\n/g, ',')}]`);
  const songsWithArtist = songs.filter(
    s => s.master_metadata_album_artist_name && s.master_metadata_album_artist_name.includes(artist)
  );

  const songsPerDayData = songsWithArtist.reduce((acc, cur) => {
    const date = cur.ts.split(' ')[0];
    return {...acc, [date]: (acc[date] || 0) + 1};
  }, {});

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(songsPerDayData));
}
