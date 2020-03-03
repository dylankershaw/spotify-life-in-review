import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

export default ({ data }) => {
  const ref = useRef(null);

  useEffect(() => {
    const myChartRef = ref.current.getContext('2d');

    new Chart(myChartRef, {
      type: 'line',
      data: {
        labels: Object.keys(data).reverse(),
        datasets: [
          {
            label: 'Songs Played',
            data: Object.values(data).reverse()
          }
        ]
      },
      options: {
        //Customize chart options
      }
    });
  }, [data]);

  return (
    <div>
      <canvas id="myChart" ref={ref} />
    </div>
  );
};
