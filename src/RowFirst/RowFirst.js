import React from 'react';
import './RowFirst.css'; // RowFirst 컴포넌트의 스타일을 정의하는 CSS 파일을 import 합니다.
import wonImage from './images/south-korean-won.png';

function RowFirst() {
  return (
    <div className="row-first">
    <h2>Sumamry</h2>
      <ul className = 'list-container'>
        <li className ='list-item'>
            <div className = 'image'>
                <img src = {wonImage} />
            </div>
            <div className = 'item-column'>
            <div className = 'item-value'>
            60,000,000 Won
            </div>
            <div className = 'item-content'>
            Total Revenue
            </div>
            </div>
        </li>
        <li className ='list-item'>
            <div className = 'image'>
                <img src = {wonImage} />
            </div>
            <div className = 'item-column'>
            <div className = 'item-value'>
            60,000,000 Won
            </div>
            <div className = 'item-content'>
            Total Revenue
            </div>
            </div>
        </li>
        <li className ='list-item'>
            <div className = 'image'>
                <img src = {wonImage} />
            </div>
            <div className = 'item-column'>
            <div className = 'item-value'>
            60,000,000 Won
            </div>
            <div className = 'item-content'>
            Total Revenue
            </div>
            </div>
        </li>
        <li className ='list-item'>
            <div className = 'image'>
                <img src = {wonImage} />
            </div>
            <div className = 'item-column'>
            <div className = 'item-value'>
            60,000,000 Won
            </div>
            <div className = 'item-content'>
            Total Revenue
            </div>
            </div>
        </li>
    </ul>
    </div>
  );
}

export default RowFirst;
