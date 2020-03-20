import React, {useEffect, useRef, useState} from 'react';
import Chart from 'chart.js';

export default ({songData, selectedArtist}) => {
  const [chartData, setChartData] = useState([]);
  const [fullPlaysOnly, setFullPlaysOnly] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!selectedArtist) return setChartData([]);

    let songs = songData.filter(s => s.master_metadata_album_artist_name?.includes(selectedArtist));

    if (fullPlaysOnly) songs = songs.filter(({reason_end}) => reason_end === 'trackdone');

    const data = songs.reduce((acc, cur) => {
      const date = cur.ts.split(' ')[0];
      return {...acc, [date]: (acc[date] || 0) + 1};
    }, {});

    setChartData(data);
  }, [songData, selectedArtist, fullPlaysOnly]);

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
      <input
        id='full-plays-only'
        type='checkbox'
        checked={fullPlaysOnly}
        onChange={e => setFullPlaysOnly(e.target.checked)}
      />
      <label htmlFor='full-plays-only'>Only include songs played in full</label>
      <canvas id='myChart' ref={ref} />
    </div>
  );
};
