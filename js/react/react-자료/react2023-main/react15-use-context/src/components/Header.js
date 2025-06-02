import React from 'react';
import { useContext } from 'react';

import { ThemeContext } from '../context/ThemeContext';
import { SimpleContext } from '../context/SimpleContext';

const Header = () => {
  const { isDark } = useContext(ThemeContext);  
  console.log('Header컴포넌트', isDark);

  const userMessage = useContext(SimpleContext);

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

