import React from 'react';
import MyChart from './MyChart';
import './RowThird.css'; // RowThird 컴포넌트의 스타일을 정의하는 CSS 파일을 import 합니다.

function RowThird() {
  return (
    <div className="row-third">
    <h2>Charts</h2>
    <MyChart/>
    </div>

  );
}

export default RowThird;
