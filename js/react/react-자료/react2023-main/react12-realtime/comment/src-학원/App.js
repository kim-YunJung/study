import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
 
import RealtimeCRUD from './components/RealtimeCRUD';
import Listener from './components/Listener';
import ChatStart from './components/ChatStart';
import ChatMessage from './components/ChatMessage';

 
function App() {  
  return (
    <BrowserRouter>
      {/* <div className="App"> */}
        <Routes>
          <Route path='/' element={<RealtimeCRUD/>} />
          <Route path='/crud' element={<RealtimeCRUD/>} />
{/* <<<<<<< HEAD
          <Route path='/listener' element={<RealtimeListener/>} />
======= */}
          <Route path='/listener' element={<Listener/>} />
          <Route path='/chat'>
            <Route index element={<ChatStart/>} />
            <Route path="talk" element={<ChatMessage/>} />
          </Route>
{/* >>>>>>> 9be282118e623f21d834134294208df9fff198fc */}
        </Routes>
      {/* </div> */}
    </BrowserRouter>  
  );
}

export default App;

