import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';

const FileUploader = () => {
  const [artist, setArtist] = useState('Above & Beyond');

  const onDrop = useCallback(
    ([file]) => {
      const reader = new FileReader();

      reader.onload = async () => {
        const resp = await fetch('/api/songs', {
          method: 'post',
          contentType: 'application/json',
          body: JSON.stringify({artist, data: reader.result})
        });

        handleResponse(resp);
      };

      reader.readAsText(file);
    },
    [artist]
  );

  const handleResponse = useCallback(() => {}, []);

  const {getRootProps, getInputProps} = useDropzone({onDrop, accept: 'application/json, .json'});

  return (
    <div>
      <input value={artist} onChange={e => setArtist(e.target.value)} />
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Click to upload (.json only)</p>
      </div>
    </div>
  );
};

export default FileUploader;
