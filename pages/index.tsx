import Head from 'next/head';
import React, {useState, useEffect} from 'react';

import ArtistDropdown from '../components/ArtistDropdown';
import FileUploader from '../components/FileUploader';
import Header from '../components/Header';
import Chart from '../components/Chart';

import {Song} from '../Types';
import {fonts} from '../theme';

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
        <title>Spotify Life in Review</title>
        <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
        <link rel='icon' href='/favicon.ico' type='image/x-icon' />
        <link
          href='https://fonts.googleapis.com/css?family=Montserrat&display=swap'
          rel='stylesheet'
        ></link>
      </Head>

      <main>
        <Header />
        <FileUploader setSongData={setSongData} />
        {!!artists.length && (
          <>
            <ArtistDropdown
              selectedArtist={selectedArtist}
              setSelectedArtist={setSelectedArtist}
              artists={artists}
            />
            <Chart songData={songData} selectedArtist={selectedArtist} />
          </>
        )}
      </main>

      <style jsx global>{`
        body {
          font-family: ${fonts.primary};
        }

        h1 {
          margin: unset;
        }

        button {
          font-family: inherit;
        }
      `}</style>
    </div>
  );
};

export default Home;
