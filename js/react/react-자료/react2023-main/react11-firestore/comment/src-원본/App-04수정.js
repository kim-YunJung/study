import './App.css';
import { firestore } from './firestoreConfig';
import { doc, setDoc, getDoc, collection, getDocs } from "firebase/firestore"; 
import { useState, useEffect } from 'react';

function App() {
  // console.log("firestore", firestore);

  const nowDate = () => {
    let dateObj = new Date();
    var year = dateObj.getFullYear();
    var month = ("0" + (1 + dateObj.getMonth())).slice(-2);
    var day = ("0" + dateObj.getDate()).slice(-2);
    return year + "-" + month + "-" + day;
  }
  
  const memberEdit = async (p_collection, p_id, p_pass, p_name) => {
    await setDoc(doc(firestore, p_collection, p_id), {      
      id: p_id,
      pass: p_pass,
      name: p_name,
      regdate: nowDate(),
    });
    console.log("수정성공");
  }

  const [showData, setShowData] = useState([]);

  useEffect(() => {    
    const getCollection = async () => {
      let trArray = [];
      const querySnapshot = await getDocs(collection(firestore, "members"));
      querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());  
        let memberInfo = doc.data();
        //console.log("파싱", doc.id, memberInfo.pass, memberInfo.name, memberInfo.regdate)
        trArray.push (
          <option key={doc.id} value={doc.id}>{memberInfo.name}</option>
        );
      });
      return trArray;
    } 
    getCollection().then((result)=>{
      console.log('result', result);
      setShowData(result);
    });
  }, []);

  const [id, setId] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');

  return (
    <div className="App">
      <h2>Firebase - Firestore 연동 App</h2>
      <h3>개별 조회 및 수정하기</h3>      
      <select onChange={async (e)=>{
        let user_id = e.target.value;
        console.log("선택", user_id);
        
        const docRef = doc(firestore, "members", user_id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          let callData = docSnap.data();
          setId(user_id);
          setPass(callData.pass);
          setName(callData.name);
        } 
        else {
          console.log("No such document!");
        }
      }}>
        <option value="">선택하세요</option>
        {showData}
      </select>
      <form onSubmit={(event) => {
        event.preventDefault();

        let collection = event.target.collection.value;
        let id = event.target.id.value;
        let pass = event.target.pass.value;
        let name = event.target.name.value;

        if(id===''){ alert('사용자를 먼저 선택해주세요'); return;}

        memberEdit(collection, id, pass, name);

        event.target.id.value = '';
        event.target.pass.value = '';
        event.target.name.value = '';
      }}>
        <table className='table table-bordered table-striped'>
          <tr>
            <td>컬렉션(테이블) </td>
            <td><input type="text" name="collection" 
                    value="members" /></td>
          </tr>
          <tr>
            <td>아이디(변경불가)</td>
            <td><input type="text" name="id" value={id} 
              onChange={(event)=>{
                setId(event.target.value);
              }} readOnly /></td>
          </tr>
          <tr>
            <td>비밀번호</td>
            <td><input type="text" name="pass" value={pass} 
              onChange={(event)=>{
                setPass(event.target.value);
              }} /></td>
          </tr>
          <tr>
            <td>이름</td>
            <td><input type="text" name="name" value={name} 
              onChange={(event)=>{
                setName(event.target.value);
              }} /></td>
          </tr>
        </table>
        <button type="submit">수정</button>
      </form>
    </div>
  );
}

export default App;

