const fs = require('fs');
const histogram = require('ascii-histogram');

const buffer = fs.readFileSync('EndSong.json');
const songList = JSON.parse(buffer);

const aAndBSongs = songList.filter(s => s.master_metadata_album_artist_name && s.master_metadata_album_artist_name.includes("Above \u0026 Beyond"));

// console.table(aAndBSongs, ["ts", "master_metadata_track_name", "master_metadata_album_album_name"])

// const firstCompletedSong = aAndBSongs.reverse().find(s => s.reason_end === "trackdone")
// console.log(firstCompletedSong)

// const firstListenDate = aAndBSongs[aAndBSongs.length - 1].ts.split(" ")[0];
// const lastListenDate = aAndBSongs[0].ts.split(" ")[0];

// console.log(firstListenDate, lastListenDate)

const histogramData = aAndBSongs.reduce((acc, cur) => {
	const date = cur.ts.split(" ")[0];
	return { ...acc, [date]: (acc[date] || 0) + 1 };
}, {});

// console.log(histogram(histogramData));
