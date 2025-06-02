import './App.css';
import {useState} from 'react';
import Board from './commons/Board';
import ComList from './commons/ComList';
import ComWrite from './commons/ComWrite';
import ComEdit from './commons/ComEdit';

/** App.js에 정의하는 대부분의 함수는 컴포넌트 제작을 위한것이지만 이와같이
일반적인 반환값을 가진 함수를 정의하는것도 가능하다. 
Date객체를 이용해서 현재 날짜를 0000-00-00 형식의 문자열로 반환해준다. */
function nowDateStr(){
  let dateObj = new Date();
  var year = dateObj.getFullYear();
  var month = ("0" + (1 + dateObj.getMonth())).slice(-2);
  var day = ("0" + dateObj.getDate()).slice(-2);
  return year + "-" + month + "-" + day;
}

/* 
수행과제: 
    번호는 1부터 자동부여.
    날짜는 Date객체 사용하여 현재날짜 및 시간 입력
    작성자와 내용은 사용자가 입력.
    수정 버튼 누르면 작성폼에 기존내용 로드
    삭제는 confirm창으로 물어본 후 처리 
*/
function App() {
  //state 선언
  //이 프로젝트의 데이터로 사용할 객체 배열 생성
  const [myData, setMyData] = useState([
    {no:1, comment:'오늘은 React공부하는날', writer:'낙짜쌤', date:'2023-01-01'},
    {no:2, comment:'어제는 Javascript공부해씸', writer:'유겸이', date:'2023-03-03'},
    {no:3, comment:'내일은 Project해야징', writer:'개똥이', date:'2023-05-05'},
  ]);
  //화면 전환을 위한 state로 기본상태는 list, 수정화면으로 전환시 edit
  const [mode, setMode] = useState('list');
  //게시물의 시퀀스로 사용할 state로 초기값은 4로 지정 
  const [nextNo, setNextNo] = useState(4);
  //수정을 위한 게시물의 일련번호 저장을 위한 state. 기본값은 null로 지정 
  const [no, setNo] = useState(null);

  let writeEditComp, selectData ;
  if(mode==='list') {
    //현재 mode가 list인 경우에는 하단에 쓰기폼이 렌더링된다. 
    writeEditComp = <ComWrite writeAction={(w, c)=>{        
      let nowDate = nowDateStr();
      //추가할 데이터 객체 
      let addData = {no:nextNo, writer:w, comment:c, date:nowDate};
      setNextNo(nextNo+1);

      //방법1 : 데이터의 복사본을 만든후 새로운 값을 추가한다. 
      let myDataCopy = [...myData];
      myDataCopy.push(addData);
      setMyData(myDataCopy);        
      
      //방법2 : 원본 배열에 새로운 값을 추가한다.(잘못된방법) 
      // myData.push(addData);
      // console.log(myData);
      // setMyData(myData);
    }}></ComWrite>;
  }
  else{    
    //mode가 edit인 경우에는 화면 하단에 수정폼을 렌더링한다. 
    console.log('no', no);
    //수정을 위한 데이터를 가져온다. 이때 state인 no를 사용한다. 
    for(let i=0 ; i<myData.length ; i++){
      if(no===myData[i].no){
        selectData = myData[i];
      }
    }
    console.log('수정데이터', selectData);    
    //앞에서 인출한 게시물을 props로 수정 컴포넌트로 전달한다. 
    writeEditComp = <ComEdit selectData={selectData} 
      /* 수정모드에서 빠져나오기 위해 '수정취소' 버튼 */
      changeMode={(pmode, pno)=>{
        setMode(pmode);
        setNo(pno);
      }}
      // 수정처리부분
      editAction={(w, c)=>{        
        let editData = {no:no, writer:w, comment:c, date:selectData.date};
        let myDataCopy = [...myData];
        for(let i=0 ; i<myDataCopy.length ; i++){
          if(myDataCopy[i].no===no){
            myDataCopy[i] = editData;
            break;
          }
        }
        setMyData(myDataCopy);
        setMode('list');
      }}
    ></ComEdit>;
  }
  
  return (
    <div className="App">
      <Board></Board>
      <ComList myData={myData} 
        onDelete={(pno)=>{
          console.log("삭제no", pno, typeof(pno));
          //배열을 복사한 후 삭제를 진행한다. 
          let myDataCopy = [...myData];
          for(let i=0 ; i<myDataCopy.length ; i++){
            if(pno === myDataCopy[i].no){
              console.log("찾음");
              myDataCopy.splice(i, 1);
            }
          }
          setMyData(myDataCopy);
          setMode('list');
        }} 
        changeMode={(pmode, pno)=>{
          if(mode==='edit' && pmode==='edit'){
            alert('현재 수정mode 입니다. 수정취소를 먼저 눌러주세요.');
          }
          else{
            setMode(pmode);
            setNo(pno);
          }
        }}></ComList>
      {writeEditComp}
    </div>
  );
}

export default App;
