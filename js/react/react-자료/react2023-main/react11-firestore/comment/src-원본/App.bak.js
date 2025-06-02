import './App.css';
import { firestore } from './firestoreConfig';
import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore"; 
import { useState } from 'react';

function App() {
  const [showData, setShowData] = useState([]);

  const getCollection = async (sField, sStr) => {
    console.log("선택", sField);
    let aaaa = {};
    let user_id = '';
    if(sField==='id'){
      user_id = sStr;
      const docRef = doc(firestore, "members", sStr);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        aaaa = docSnap.data();
      } 
      else {
        console.log("No such document!");
      }
    }
    else if(sField==='name'){
      const membersRef = collection(firestore, "members");
      console.log('membersRef', membersRef, membersRef._path.segments[0]);
      // user_id = membersRef._path.segments[0];
      const q = query(membersRef, where("name", "==", sStr));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        aaaa = doc.data();
      });
    }

    let trArray = [];
    trArray.push (
      <tr key={doc.id}>
        <td className="cen">{aaaa.id}</td>
        <td className="cen">{aaaa.pass}</td>
        <td className="cen">{aaaa.name}</td>
        <td className="cen">{aaaa.regdate}</td>
      </tr>  
    );
     
    //여기서 State 변경
    setShowData(trArray);
  }

  return (
    <div className="App">
      <h2>Firebase - Firestore 연동 App</h2>
      <h3>검색하기</h3>
      <form onSubmit={(e) => {
        e.preventDefault();
        let sf = e.target.searchField.value;
        let ss = e.target.searchStr.value;
        getCollection(sf, ss);
      }}>
        <select name="searchField">
          <option value="id">아이디</option>
          <option value="name">이름</option>
        </select>
        <input type="text" name="searchStr" style={{width:'150px'}}/>
        <button type='submit'>전체조회</button>
      </form>
      <table className='table table-bordered'>
        <thead>
          <tr className='text-center'>
            <th>아이디</th><th>비밀번호</th><th>이름</th><th>가입일</th>
          </tr>
        </thead>
        <tbody>
          {showData}
        </tbody>
      </table>
    </div>
  );
}

export default App;
