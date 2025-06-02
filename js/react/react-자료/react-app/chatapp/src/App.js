/* eslint-disable */ 
import { useEffect, useState } from 'react';
import './App.css';
import socket from './server';
import InputField from './components/InputField/InputField';
import InputField from './components/MessageContainer/MessageContainer';
import MessageContainer from './components/MessageContainer/MessageContainer';

function App() {
  useEffect(() => {
    //서버에서 보낸 내용을 읽는다.
    socket.on('message', (message)=>{
      //기존에 있는 내용 뒤에 덧붙여준다.
      setMessageList((prevState)=> prevState.concat(message));
    });
    askUserName();
  }, []);

  //유저 정보를 저장하기 위한 state
  const[user, setUser] = useState(null);
  const[message, setMessage] = useState('');
  const[messageList, setMessageList] = useState([]);

  const askUserName = () => {   
    const userName = prompt("당신의 이름을 입력하세요.")
    console.log("user name ", userName) 

    //로그인을 위해 유저이름과 콜백함수를 보낸다.
    //emit처리가 되면 콜백함수로 응답을 받는다.
    socket.emit("login", userName, (res) => {
      console.log('Res ', res);

      //if(res.ok){
      if(res?.ok){
        //유저정보를 저장
        setUser(res.data);
      }
    });
  }

  const sendMessage = (e) => {
    e.preventDefault();

    socket.emit("sendMessage", message, (res)=> {
      
    });
  }

  return (
    <>
      <div className="App">
        <MessageContainer messageList={messageList} user={user} />
        <InputField message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </>
  );
}

export default App;