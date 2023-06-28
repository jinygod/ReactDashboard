import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import HeadTitle from './HeadTitle/HeadTitle';
import RowFirst from './RowFirst/RowFirst';
import RowSecond from './RowSecond/RowSecond';
import RowThird from './RowThird/RowThird';
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( 
  <div className = 'container'>
    <div className = 'head-title'>
      <HeadTitle />
    </div>
      <div className = 'row-first'>
    <RowFirst />
    </div>
      <div className = 'row-second'>
    <RowSecond />
    </div>
      <div className = 'row-third'>
    <RowThird />
    </div>
  </div>
);

reportWebVitals();