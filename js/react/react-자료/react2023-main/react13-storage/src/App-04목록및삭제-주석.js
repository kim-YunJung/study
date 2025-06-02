import './App.css';
import { useState, useEffect } from 'react';
import { storage } from './storageConfig'
import { ref, listAll, deleteObject } from "firebase/storage";
 
function App() {  
  //스토리지 연결 및 참조 생성
  const listRef = ref(storage, '');

  //파일목록 및 삭제후 전체렌더링
  const [fileLists, setFileLists] = useState([]);  
  const [renderFlag, setRenderFlag] = useState(false);  

  useEffect(() => {
    let fileRows = [];
    // 생성된 참조에서 모든 폴더와 파일명 인출
    listAll(listRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          //폴더명 출력
          console.log('폴더', folderRef);
        });
        res.items.forEach((itemRef) => {
          //이미지 참조를 얻어온다.
          const deleteRef = ref(storage, itemRef.fullPath);

          //파일 목록 추가
          fileRows.push(
            <tr key={itemRef.name}>
              <td>{itemRef.bucket}</td>
              <td>{itemRef.fullPath}</td>
              <td>{itemRef.name}</td>
              <td><button type='button' onClick={(e) => {
                if(window.confirm('삭제할까요?')){
                  deleteObject(deleteRef).then(() => {
                    console.log("파일 삭제 성공");
                    setRenderFlag(!renderFlag);
                  })
                  .catch((error) => {
                    console.log("파일 삭제 실패");
                  });
                }
              }}>삭제</button></td>
            </tr> 
          );
        });
        setFileLists(fileRows);
      })
      .catch((error) => {
        console.log('에러발생', error);
      });
  }, [renderFlag]);
  
  console.log('렌더링');
  return (
    <div className="App">
      <h2>Firebase - Storage App</h2>
      <h3>파일 목록 및 삭제</h3>
      <table border={1}>
        <thead>
        <tr>
          <th>bucket</th>
          <th>fullPath</th>
          <th>name</th>
          <th>삭제</th>
        </tr>
        </thead>
        <tbody>
          {fileLists}
        </tbody>
      </table>
    </div>
  );
}

export default App;
