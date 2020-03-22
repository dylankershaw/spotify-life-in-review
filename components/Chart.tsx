import React, {useEffect, useRef, useState} from 'react';
import Chart from 'chart.js';
import {Song, ChartData} from '../Types';

interface Props {
  songData: Array<Song>;
  selectedArtist: string;
}

const ChartComponent: React.FC<Props> = ({songData, selectedArtist}) => {
  const [chartData, setChartData] = useState<ChartData>({});
  const [fullPlaysOnly, setFullPlaysOnly] = useState(false);
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!selectedArtist) return setChartData({});

    let songs = songData.filter((s: Song) =>
      s.master_metadata_album_artist_name?.includes(selectedArtist)
    );

    if (fullPlaysOnly) songs = songs.filter(({reason_end}) => reason_end === 'trackdone');

    const data = songs.reduce((acc: ChartData, cur) => {
      const date = cur.ts.split(' ')[0];
      return {...acc, [date]: (acc[date] || 0) + 1};
    }, {});

    setChartData(data);
  }, [songData, selectedArtist, fullPlaysOnly]);

  useEffect(() => {
    const chartRef = ref?.current?.getContext('2d');
    if (!chartRef) return;

    new Chart(chartRef, {
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

export default ChartComponent;
