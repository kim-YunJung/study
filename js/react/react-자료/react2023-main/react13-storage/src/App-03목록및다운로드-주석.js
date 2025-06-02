import './App.css';
import { useState, useEffect } from 'react';
import { storage } from './storageConfig'
import { ref, listAll, getDownloadURL } from "firebase/storage";
 
function App() {
  //스토리지 연결 및 참조 생성
  const listRef = ref(storage, '');

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
          //아이템(파일) 출력
          console.log('파일명', itemRef.name);

          //파일 URL 다운로드
          getDownloadURL(ref(storage, itemRef.name))
            .then((url)=>{
              console.log('파일 URL 다운로드');
              //<img>에 설정된 id를 통해 DOM 획득 
              const img = document.getElementById(`img_${itemRef.name}`);
              //이미지의 src와 width속성 부여 
              img.setAttribute('src', url);
              img.setAttribute('width', '200');
            })
            .catch((error)=>{
              console.log("이미지 다운로드 중 에러", error)
            });

          fileRows.push(
            <tr key={itemRef.name}>
              <td>{itemRef.bucket}</td>
              <td>{itemRef.fullPath}</td>
              <td>{itemRef.name}</td>
              <td><img id={`img_${itemRef.name}`} alt='' /></td>
            </tr> 
          );          
        });

        // console.log('State변경');
        setFileLists(fileRows);
      })
      .catch((error) => {
        console.log('파일 목록 출력중 에러발생', error);
      });
  }, []);
 
  //파일목록   
  const [fileLists, setFileLists] = useState([]);  
  console.log('렌더링');
  return (
    <div className="App">
      <h2>Firebase - Storage App</h2>
      <h3>파일 목록 및 이미지 다운로드</h3>
      <table border={1}>
        <thead>
        <tr>
          <th>bucket</th>
          <th>fullPath</th>
          <th>name</th>
          <th>이미지</th>
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
