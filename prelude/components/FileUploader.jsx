import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';

const FileUploader = () => {
  const [artist, setArtist] = useState('Above & Beyond');

  const onDrop = useCallback(
    ([file]) => {
      const reader = new FileReader();

      reader.onload = () => {
        const songs = JSON.parse(`[${reader.result.replace(/\n/g, ',')}]`);
        const chartData = getChartData(songs);
      };

      reader.readAsText(file);
    },
    [artist]
  );

  const getChartData = useCallback(songs => {
    const songsWithArtist = songs.filter(
      s =>
        s.master_metadata_album_artist_name && s.master_metadata_album_artist_name.includes(artist)
    );

    const songsPerDayData = songsWithArtist.reduce((acc, cur) => {
      const date = cur.ts.split(' ')[0];
      return {...acc, [date]: (acc[date] || 0) + 1};
    }, {});

    return songsPerDayData;
  });

  const {getRootProps, getInputProps} = useDropzone({onDrop, accept: 'application/json, .json'});

  return (
    <div>
      <input value={artist} onChange={e => setArtist(e.target.value)} />
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Click to upload (.json only)</p>
      </div>
    </div>
  );
};

export default FileUploader;
