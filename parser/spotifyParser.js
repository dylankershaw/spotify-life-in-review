const fs = require('fs');
// const histogram = require('ascii-histogram');

const buffer = fs.readFileSync("EndSong_comma_delimited.json");
const songList = JSON.parse(buffer);

const aAndBSongs = songList.filter(
  ({ master_metadata_album_artist_name: artist = "" }) =>
    artist.includes("Above \u0026 Beyond")
);

const firstCompletedSong = aAndBSongs
  .reverse()
  .find(({ reason_end }) => reason_end === "trackdone");

console.log(firstCompletedSong);

// const firstListenDate = aAndBSongs[aAndBSongs.length - 1].ts.split(" ")[0];
// const lastListenDate = aAndBSongs[0].ts.split(" ")[0];

// console.log(firstListenDate, lastListenDate)

// const histogramData = aAndBSongs.reduce((acc, cur) => {
//   const date = cur.ts.split(" ")[0];
//   return { ...acc, [date]: (acc[date] || 0) + 1 };
// }, {});

// console.log(histogram(histogramData));
