import React, { useEffect, useState } from 'react';

import FileUploader from './components/FileUploader';
import Chart from './components/Chart';

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div>
      <FileUploader setData={setData} />
      <Chart data={data} />
    </div>
  );
}

export default App;
