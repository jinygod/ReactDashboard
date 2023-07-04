import React from 'react';
import './RowThird.css'; 
import LineChart from './LineChart';

function RowThird() {
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [{
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  return (
    <div className="row-third">
      <h2>Charts</h2>
     <div className = "mychart">
       <LineChart chartData={chartData} />
      </div>
    </div>
  );
}

export default RowThird;