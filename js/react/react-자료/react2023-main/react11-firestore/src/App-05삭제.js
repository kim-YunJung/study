import './App.css';
import { firestore } from './firestoreConfig';
import { doc, deleteDoc, getDoc, collection, getDocs } from "firebase/firestore"; 
import { useState, useEffect } from 'react';

function App() {
  const [showData, setShowData] = useState([]);
  useEffect(() => {    
    const getCollection = async () => {
      let trArray = [];
      const querySnapshot = await getDocs(collection(firestore, "members"));
      querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());  
        let memberInfo = doc.data();
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
      <h3>개별 조회 및 삭제하기</h3>        
      <form onSubmit={async (event) => {
        event.preventDefault();
        let id = event.target.id.value;        
        console.log("삭제", id);
        if(id===''){ alert('사용자를 먼저 선택해주세요'); return;}

        //선택한 아이디를 폼에 채운 후 submit하면 deleteDoc을 통해 문서삭제 
        await deleteDoc(doc(firestore, "members", event.target.id.value));        

        //삭제가 완료되면 입력폼을 비워준다. 
        setId('');
        setPass('');
        setName('');
      }}>
        <div class="input-group" id="myForm">
          <select className="form-control" onChange={async (e)=>{
            let user_id = e.target.value;
            // console.log("선택", user_id);        
            const docRef = doc(firestore, "members", user_id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              // console.log("Document data:", docSnap.data());
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
          <button type="submit" className="btn btn-danger">삭제</button>
        </div>
        <table className='table table-bordered'>
        <tbody>
          <tr>
            <th>컬렉션(테이블) </th>
            <td><input type="text" name="collection" value="members" 
                  className="form-control"/></td>
          </tr>
          <tr>
            <th>아이디(변경불가)</th>
            <td><input type="text" name="id" value={id} className="form-control"/></td>
          </tr>
          <tr>
            <th>비밀번호</th>
            <td><input type="text" name="pass" value={pass} className="form-control"/></td>
          </tr>
          <tr>
            <th>이름</th>
            <td><input type="text" name="name" value={name} className="form-control"/></td>
          </tr>
        </tbody>
        </table>
      </form>
    </div>
  );
}

export default App;

