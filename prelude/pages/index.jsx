import Head from 'next/head';
import React, {useState, useEffect} from 'react';

import FileUploader from '../components/FileUploader';
import Chart from '../components/Chart';

const Home = () => {
  const [songData, setSongData] = useState([]);
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(artists[0]);

  useEffect(() => {
    const newArtistList = [];
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
              {artists.map(a => (
                <option key={a} value={a}>
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
