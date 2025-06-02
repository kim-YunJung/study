import './App.css';
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom';

import List from './components/board/List';
import Write from './components/board/Write';
import View from './components/board/View';
import NotFound from './components/common/NotFound';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<List></List>} />
          <Route path='/list' element={<List></List>} />
          <Route path='/view'element={<View></View>} />
          <Route path='/write' element={<Write></Write>} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

