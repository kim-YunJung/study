import React, { useState } from 'react';
import { realtime } from '../realtimeConfig';
import { ref, set } from "firebase/database";
import { getDatabase, child, get,  push, update, remove } from "firebase/database";
import Navi from '../components/Navi';

function RealtimeCRUD() {
  //database 연결 확인
  console.log("realtime", realtime);

  //데이터쓰기
  function writeUserData(userId, userName, userPass) {
    const newPostKey = push(child(ref(realtime), 'tempValue')).key;
    set(ref(realtime, 'users/' + userId), {
      name: userName,
      pass: userPass,
      fireKey: newPostKey
    });
    console.log('입력성공');
  }

  //데이터 읽기
  function readUserData(userId) {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } 
      else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  //데이터 수정
  function editUserData(userId, userName, userPass) {    
    const newPostKey = push(child(ref(realtime), 'tempValue')).key;
    const postData = {
      name: userName,
      pass: userPass,
      fireKey: newPostKey
    };
    
    const updates = {};
    updates['/users/' + userId] = postData;
    return update(ref(realtime), updates);
  }

  //데이터 삭제1
  function deleteUserData1(userId) {  
    const deletes = {};
    deletes['/users/' + userId] = null;
    return update(ref(realtime), deletes);
  }

  //데이터 삭제2
  function deleteUserData2(userId) {  
    remove(ref(realtime, 'users/' + userId))
    .then(()=>{
      console.log('삭제완료');
    })
    .catch((error)=>{
      console.error('삭제실패', error);
    });
  }

  const [addNum, setAddNum] = useState(0);

  //입력데이터(수정해서 사용하세요.)
  let adder = "-"+addNum;
  const id = 'nakja'+adder;
  const name = "낙자쌤"+adder;
  const pass = "xyz"+adder;

  return (
    <div className="App">
      <Navi />
      <h2>Firebase - Realtime Database App</h2>      
      <h3>01.CRUD</h3>
      <input type="number" value={addNum} onChange={(e)=>{setAddNum(e.target.value);}} />
      <input type='button' value='입력' onClick={()=>{
        writeUserData(id, name, pass);
      }} />
      <input type='button' value='읽기' onClick={()=>{
        readUserData(id);
      }} />
      <input type='button' value='수정' onClick={()=>{
        editUserData(id, name+'edit', pass+'edit');
      }} />
      <input type='button' value='삭제1' onClick={()=>{
        deleteUserData1(id);
      }} />
      <input type='button' value='삭제2' onClick={()=>{
        deleteUserData2(id);
      }} />
    </div>
  );
}

export default RealtimeCRUD;

