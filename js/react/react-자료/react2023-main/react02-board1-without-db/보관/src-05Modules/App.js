import './App.css';
//State를 사용하기 위한 리엑트 훅 
import {useState} from 'react';

/** 컴포넌트를 모듈화하면 js 혹은 jsx로 제작하게 되는데, 이를 임포트
할때는 확장자는 상관없이 경로에 대해서만 명시하면된다. */
import NavList from './components/navigation/NavList'
import NavView from './components/navigation/NavView'
import NavWrite from './components/navigation/NavWrite'
import ArticleList from './components/article/ArticleList'
import ArticleView from './components/article/ArticleView'
import ArticleWrite from './components/article/ArticleWrite'

function ReadyComp(){
  return (
    <div>
      <h3>컴포넌트 준비중입니다^^*</h3>
      <a href='/'>Home바로가기</a>
    </div>
  );
}

//매개변수 props를 통해 전달된값을 받아 사용할 수 있다. 
function Header(props){
  console.log('props', props.title);
  return (
    <header>
      <h2>{props.title}</h2>
    </header>
  )
}
 
function App() {
  //게시판의 데이터로 사용할 객체형 배열 
  const boardData = [
    {no:1, title:'오늘은 React공부하는날', writer:'낙짜쌤', date:'2023-01-01', contents:'React를 뽀개봅시당'},
    {no:2, title:'어제는 Javascript공부해씸', writer:'유겸이', date:'2023-03-03', contents:'Javascript는 할게 너무 많아요'},
    {no:3, title:'내일은 Project해야징', writer:'개똥이', date:'2023-05-05', contents:'Project는 뭘 만들어볼까?'},
  ];

  /** 화면전환을 위한 State생성. 변수명은 mode, 초기값은 list, 변경시 사용할
  함수는 setMode()로 지정한다. */
  const [mode, setMode] = useState('list');

  //컴포넌트와 제목을 저장할 변수 생성 
  let articleComp, navComp, titleVar ;

  //mode의 값에 따라 각 화면을 전환한다. 
  if(mode==='list'){
    titleVar = '게시판-목록(props)';
    navComp = <NavList onChangeMode={()=>{        
      setMode('write');
    }}></NavList>
    articleComp = <ArticleList boardData={boardData} 
      onChangeMode={(no)=>{
        console.log('선택한 게시물 번호:'+ no);
        setMode('view');
      }
    }></ArticleList>
  }
  else if(mode==='view'){
    titleVar = '게시판-읽기(props)';
    navComp = <NavView onChangeMode={(pmode)=>{
      setMode(pmode);
    }}></NavView>    
    articleComp = <ArticleView></ArticleView>
  }
  else if(mode==='write'){
    titleVar = '게시판-쓰기(props)';
    navComp = <NavWrite onChangeMode={()=>{
      setMode('list');
    }}></NavWrite>
    articleComp = <ArticleWrite></ArticleWrite>;
  }
  else{
    //mode의 값이 없는경우 '준비중'을 화면에 출력한다.
    navComp = <ReadyComp></ReadyComp>;
    articleComp = '';
  }

  /** State인 mode의 변화에 따라 화면은 새롭게 렌더링된다. */
  return (
    <div className="App">
      <Header title={titleVar}></Header>
      {navComp}
      {articleComp}
    </div>
  );
}

export default App;

