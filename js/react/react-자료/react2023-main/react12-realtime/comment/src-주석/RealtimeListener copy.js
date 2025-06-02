import React from 'react';
import { useEffect, useState } from 'react';
import { realtime } from './realtimeConfig';
import { ref, onValue } from "firebase/database";

function RealtimeListener() {
  console.log('aa'); 
  const [fireData, setFireData] = useState([]);
  
  //리스너(이벤트 수신 대기 )
  /** 
  onValue() : 경로의 데이터를 읽고 변경사항을 수신 대기. 이벤트 발생 시점에 특정 경로에 있던 콘텐츠의 정적 스냅샷을 읽는 데 사용할 수 있음.
  이 메서드는 리스너가 연결될 때 한 번 트리거된 후 하위 요소를 포함하여 데이터가 변경될 때마다 다시 트리거된다. 
   */

  //입력데이터(수정해서 사용하세요.)
  // let postId = 'a1';
  // const starCountRef = ref(realtime, 'users/'+ postId);
  const dbRef = ref(realtime, 'users');
  useEffect(() => {
    onValue(dbRef, (snapshot) => {
      let showTr = [];   
      // 전체를 객체로 가져옴
      // const data = snapshot.val();
      // console.log('data', data, data.nakja);
      
      //Key와 Value를 나눠서 가져옴
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        //console.log(childKey, childData);
        showTr.push(
          <tr>
            <td>{childKey}</td>
            <td>{childData.name}</td>
            <td>{childData.pass}</td>
            <td>{childData.fireKey}</td>
          </tr>
        );
      });
      console.log('bb', showTr); 
      setFireData(showTr);
    });
  }, []);
 
    
  console.log('cc'); 
  return (
    <div className="App">
      <h2>Firebase - Realtime Database App</h2>      
      <h3>02.Listener</h3>
      <table border={1} className='table table-bordered'>
        <tr>
          <th>아이디</th>
          <th>이름</th>
          <th>패스워드</th>
          <th>고유키</th>
        </tr>
        {fireData}
      </table>
    </div>
  );
}

export default RealtimeListener;