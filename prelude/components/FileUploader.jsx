import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';

const FileUploader = ({setSongData}) => {
  const onDrop = useCallback(([file]) => {
    const reader = new FileReader();

    reader.onload = () => {
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
