import Head from 'next/head';
import React, {useState} from 'react';

import FileUploader from '../components/FileUploader';
import Chart from '../components/Chart';

const Home = () => {
  const [songData, setSongData] = useState([]);
  const [artist, setArtist] = useState('Above & Beyond');

  return (
    <div>
      <Head>
        <title>Life in Review</title>
        <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
        <link rel='icon' href='/favicon.ico' type='image/x-icon' />
      </Head>

      <main>
        {/* TODO: make this a select dropdown */}
        <input value={artist} onChange={e => setArtist(e.target.value)} />
        <FileUploader setSongData={setSongData} />
        <Chart songData={songData} artist={artist} />
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
