import React from 'react';
import { useEffect, useState } from 'react';
import { realtime } from './realtimeConfig';
import { ref, onValue } from "firebase/database";

function RealtimeListener() {
  console.log('리스너 동작'); 
  const [fireData, setFireData] = useState([]);
 
  const dbRef = ref(realtime, 'users');
  useEffect(() => {
    onValue(dbRef, (snapshot) => {
      let showTr = [];   
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