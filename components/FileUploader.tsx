import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import {Song} from '../Types';

interface Props {
  setSongData(songs: Array<Song>): void;
}

const FileUploader: React.FC<Props> = ({setSongData}) => {
  const onDrop = useCallback(([file]) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== 'string') return;
      const songs = JSON.parse(`[${reader.result.replace(/\n/g, ',')}]`);
      setSongData(songs);
    };

    reader.readAsText(file);
  }, []);

  const {getRootProps, getInputProps} = useDropzone({onDrop, accept: 'application/json, .json'});

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Click to upload (.json only)</p>
      </div>
    </div>
  );
};

export default FileUploader;
