import Head from 'next/head';

import FileUploader from '../components/FileUploader';

const Home = () => (
  <div>
    <Head>
      <title>Life in Review</title>
      <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
      <link rel='icon' href='/favicon.ico' type='image/x-icon' />
    </Head>

    <main>
      <FileUploader />
    </main>

    <footer></footer>
  </div>
);

export default Home;
