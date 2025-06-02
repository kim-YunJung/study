import React from 'react';

//매개변수 props를 통해 한꺼번에 전달받는다. 이 경우 객체형식으로 사용한다. 
const CompProps2 = (props) => {
  return (
    <div>
      <h4>Props2 컴포넌트</h4>
      {props.propData2} <br />
      myNumber : {props.myNumber}
    </div>  
  );
}

export default CompProps2;
