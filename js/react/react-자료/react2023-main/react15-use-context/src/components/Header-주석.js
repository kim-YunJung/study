import React from 'react';
import { useContext } from 'react';

import { ThemeContext } from '../context/ThemeContext';
import { MyContext } from '../context/SimpleContext';

/** 아래 3개의 컴포넌트는 Page 컴포넌트를 거치지 않고 
useContext 훅을 통해 데이터를 직접 받을 수 있다. 
*/
const Header = () => {
  const { isDark } = useContext(ThemeContext);  
  console.log('Header컴포넌트', isDark);

  /**
  <App> 컴포넌트를 감싸지 않는다면 초기값인 'React.js'로 설정된다.
  만약 감싸면 value Props로 전달된 값인 '리엑트.js'로 설정된다. 
   */
  const userMessage = useContext(MyContext);

  return (
    <header className="header" 
      style={{
        backgroundColor : isDark ? 'black' : 'lightgray', 
        color : isDark ? 'white' : 'black'
      }}
    >
      <h1>{userMessage}..!!</h1>
    </header>
  );
}


export default Header;