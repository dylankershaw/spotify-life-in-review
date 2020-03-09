import React, {useEffect, useRef, useState} from 'react';
import Chart from 'chart.js';

export default ({songData, artist}) => {
  const [chartData, setChartData] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    if (!artist) return setChartData([]);

    const songsWithArtist = songData.filter(s =>
      s.master_metadata_album_artist_name?.includes(artist)
    );

    const data = songsWithArtist.reduce((acc, cur) => {
      const date = cur.ts.split(' ')[0];
      return {...acc, [date]: (acc[date] || 0) + 1};
    }, {});

    setChartData(data);
  }, [songData, artist]);

  useEffect(() => {
    const myChartRef = ref.current.getContext('2d');

    new Chart(myChartRef, {
      type: 'line',
      data: {
        labels: Object.keys(chartData).reverse(),
        datasets: [
          {
            label: 'Songs Played',
            data: Object.values(chartData).reverse()
          }
        ]
      },
      options: {
        //Customize chart options
      }
    });
  }, [chartData]);

  return (
    <div>
      <canvas id='myChart' ref={ref} />
    </div>
  );
};
