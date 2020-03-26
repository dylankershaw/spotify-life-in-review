import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import {Song} from '../Types';

import {breakpoints, colors} from '../theme';

interface Props {
  setSongData(songs: Array<Song>): void;
}

const FileUploader: React.FC<Props> = ({setSongData}) => {
  const onDrop = useCallback(([file]) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== 'string') return;

      const jsonIsLineDelimited = reader.result.indexOf('},') === -1;
      const songs = JSON.parse(
        jsonIsLineDelimited ? `[${reader.result.replace(/\n/g, ',')}]` : reader.result
      );

      setSongData(songs);
    };

    reader.readAsText(file);
  }, []);

  const {getRootProps, getInputProps} = useDropzone({onDrop, accept: 'application/json, .json'});

  return (
    <div className='container'>
      <button {...getRootProps()}>
        <input {...getInputProps()} />
        <p>UPLOAD</p>
      </button>
      <p>(EndSong.json only please)</p>
      <style jsx>
        {`
          .container {
            display: flex;
            flex-direction: column;
            margin: 0 auto;
            width: fit-content;
          }

          @media screen and (min-width: ${breakpoints.sm}) .container {
            margin: initial;
          }

          button {
            background: ${colors.green};
            border: none;
            border-radius: 1rem;
            color: white;
            margin-top: 2rem;
            padding: 0.5rem;
          }
        `}
      </style>
    </div>
  );
};

export default FileUploader;
