import React, {useCallback} from 'react';
import {Song} from '../Types';

import {breakpoints, colors} from '../theme';

interface Props {
  setSongData(songs: Array<Song>): void;
}

const FileUploader: React.FC<Props> = ({setSongData}) => {
  const handleDrop = useCallback(e => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== 'string') return;

      const jsonIsLineDelimited = reader.result.indexOf('},') === -1;
      const songs = JSON.parse(
        jsonIsLineDelimited ? `[${reader.result.replace(/\n/g, ',')}]` : reader.result
      );

      setSongData(songs);
    };

    reader.readAsText(e.target.files[0]);
  }, []);

  return (
    <div className='container'>
      <label htmlFor='upload-input'>UPLOAD</label>
      <span className='small-text'>(EndSong.json only please)</span>
      <input id='upload-input' type='file' accept='application/json,.json' onChange={handleDrop} />
      <style jsx>
        {`
          .container {
            align-items: center;
            display: flex;
            flex-direction: column;
            margin: 2rem auto 0;
            width: fit-content;
          }
          
          @media screen and (min-width: ${breakpoints.sm}) .container {
            margin: initial;
          }

          input {
            background: ${colors.green};
            border: none;
            border-radius: 1rem;
            color: white;
            padding: 0.5rem;
          }

          .small-text {
            font-size: 0.8rem;
          }
        `}
      </style>
    </div>
  );
};

export default FileUploader;
