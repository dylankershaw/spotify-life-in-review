import Head from 'next/head';
import React, {useState, useEffect} from 'react';

import FileUploader from '../components/FileUploader';
import Chart from '../components/Chart';
import {Song} from '../Types';

const Home = () => {
  const [songData, setSongData] = useState<Array<Song>>([]);
  const [artists, setArtists] = useState<Array<string>>([]);
  const [selectedArtist, setSelectedArtist] = useState<string>(artists[0]);

  useEffect(() => {
    const newArtistList: Array<string> = [];
    songData.map(({master_metadata_album_artist_name: artist}) => {
      if (!newArtistList.includes(artist)) newArtistList.push(artist);
    });
    setArtists(newArtistList.sort());
  }, [songData]);

  return (
    <div>
      <Head>
        <title>Life in Review</title>
        <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
        <link rel='icon' href='/favicon.ico' type='image/x-icon' />
      </Head>

      <main>
        <FileUploader setSongData={setSongData} />
        {!!artists.length && (
          <>
            <select value={selectedArtist} onChange={e => setSelectedArtist(e.target.value)}>
              {artists.map((a, i) => (
                <option key={i} value={a}>
                  {a}
                </option>
              ))}
            </select>
            <Chart songData={songData} selectedArtist={selectedArtist} />
          </>
        )}
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
