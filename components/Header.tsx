import React from 'react';

import {colors} from '../theme';

const Header = () => {
  return (
    <>
      <h1>Visualize your lifetime listening data.</h1>
      <div className='description'>
        To use this app, you'll first need a copy of your EndSong.json file from Spotify. You can
        obtain this by{' '}
        <a href='https://support.spotify.com/us/contact-spotify-support/'>
          contacting customer support
        </a>{' '}
        and requesting a copy of your lifetime listening data.
      </div>
      <style jsx>{`
        h1 {
          color: ${colors.green};
        }

        .description {
          margin-top: 1rem;
        }
      `}</style>
    </>
  );
};

export default Header;
