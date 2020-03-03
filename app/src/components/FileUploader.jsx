import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default ({ setData }) => {
  const cleanData = useCallback(str => {
    const parsedData = JSON.parse(`[${str.replace(/\n/g, ',')}]`);
    
    const filteredData = parsedData.filter(
      s => s.master_metadata_album_artist_name && s.master_metadata_album_artist_name.includes('Above \u0026 Beyond')
    );
    
    return filteredData.reduce((acc, cur) => {
      const date = cur.ts.split(' ')[0];
      return { ...acc, [date]: (acc[date] || 0) + 1 };
    }, {});
  }, []);

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        const dataStr = reader.result;
        setData(cleanData(dataStr));
      };

      reader.readAsText(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop the files here ...</p> : <p>Drag 'n' drop some files here, or click to select files</p>}
    </div>
  );
};
