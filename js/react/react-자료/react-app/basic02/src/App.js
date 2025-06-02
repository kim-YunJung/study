/* eslint-disable */ 

import { useState } from 'react';
import Box from './Box';
import BoxChange from './BoxChange';

function App() {  
  let [count, setCont] = useState(0);

  const increase = () => {
    setCont(count+1);
  }

  return (
    <div className="App">
      <Box/>

      <BoxChange name = "text 01" num = "01"/>
      <BoxChange name = "text 02" num = "02"/>
      <BoxChange name = "text 03" num = "03"/>
    
      <span>{count}</span>
      <button onClick={increase}>증가</button>
    </div>
  );
}

export default App;
