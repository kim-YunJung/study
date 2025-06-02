import React from 'react';
import CompState2 from './CompProps2';

// Props 속성명을 그대로 사용한다. 이경우 갯수만큼 콤마로 구분해서 기술해야한다. 
const CompProps1 = ( {propData, myNumber} ) => {
  return (
    <div>
      <h4>Props1 컴포넌트</h4>
      {propData}
      <CompState2 propData2={propData} myNumber={myNumber} />
    </div>  
  );
}

export default CompProps1;
