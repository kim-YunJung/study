import './App.css';
import React, {useState, useEffect} from 'react';

function MyCommunication(props){
  
  /* 외부 서버의 API를 얻어오기 위해 State생성. 초기값은 JSON의
  포맷에 따라 달라질 수 있으므로 확인 후 설정하도록 한다. */
  var [myJSON, setmyJSON] = useState({results:[]});  
  
  //컴포넌트가 먼저 렌더링 된 후 실행을 위한 리엑트 훅 
  useEffect(function(){
    //API 서버에서 10명의 정보를 JSON으로 콜백받는다. 
    fetch("https://api.randomuser.me?results=10")
      .then((result)=>{
        //console.log(result);
        return result.json();
      })
      .then((json)=>{
        console.log(json);
        //JSON데이터를 통해 State를 변경한다. 
        setmyJSON(json);
      });
    return ()=>{
      console.log('#Life','useEffect실행==>컴포넌트 언마운트');
    }
  }, []);
  /* useEffect()의 두번째 인자인 의존성배열에 빈 배열을 지정한다. 
  만약 지정되지 않으면 렌더링마다 다시 실행되므로 화면이 무한히 새로고침되는
  현상이 발생된다. */

  //콜백받은 JSON데이터를 파싱하여 <tr>태그로 구성한다. 
  let trTag = [];
  for(let i=0 ; i<myJSON.results.length ; i++){
    //현재 루프에서의 객체 하나를 가져온다. 
    let data = myJSON.results[i];
    //썸네일 이미지와 이름 등의 정보등을 파싱해서 <tr>태그로 구성한다.
    trTag.push(
      <tr key={data.login.md5}>
        <td><img src={data.picture.thumbnail} alt={data.login.username} /></td>
        {/* 아이디를 클릭하면 Props로 전달된 함수를 호출한다. 현재 루프의
        객체를 그대로 인자로 전달한다. */}
        <td><a href='/' onClick={(e)=>{
            e.preventDefault();
            props.onProfile(data);
          }}>{data.login.username}</a>
        </td>
        <td>{data.name.title} {data.name.first} {data.name.last}</td>
        <td>{data.nat}</td>
        <td>{data.email}</td>
      </tr>
    );
  }
 
  //UI를 렌더링한다. 
  return (
    <div>
       <table border='1'>
        <thead>
          <tr>
            <th>사진</th>
            <th>로그인</th>
            <th>이름</th>
            <th>국가</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>{trTag}</tbody>
       </table>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <h2>React - 외부서버통신</h2>
      {/* 링크를 클릭하면 정보를 파싱한 문자열을 alert로 출력한다.  */}
      <MyCommunication onProfile={(sData)=>{
        console.log(sData);
        /* 정보출력을 위한 문자열은 백틱 기호를 이용해서 +와 같은 연결
        기호 없이 내용을 추가할 수 있다.  */
        let info = `전화번호:${sData.cell}
성별:${sData.gender}
username:${sData.login.username}
password:${sData.login.password}`;
        alert(info);
      }}></MyCommunication>
    </div>
  );
}

export default App;
