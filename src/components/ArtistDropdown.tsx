import React from 'react';

import {colors} from '../theme';

interface Props {
  selectedArtist: string;
  setSelectedArtist(artist: string): void;
  artists: Array<string>;
}

const ArtistDropdown: React.FC<Props> = ({selectedArtist, setSelectedArtist, artists}) => {
  return (
    <div className='container'>
      Select an artist:
      <select value={selectedArtist} onChange={e => setSelectedArtist(e.target.value)}>
        {artists.map((a, i) => (
          <option key={i} value={a}>
            {a}
          </option>
        ))}
      </select>
      <style jsx>
        {`
          .container {
            margin-top: 2rem;
          }

          select {
            background-color: ${colors.green};
            border-radius: 1rem;
            color: white;
            display: block;
            max-width: 100%;
          }
        `}
      </style>
    </div>
  );
};

export default ArtistDropdown;
