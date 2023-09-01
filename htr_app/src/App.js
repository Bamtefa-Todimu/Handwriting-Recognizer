import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Auth from './components/Auth';
import Header from './components/Header';
import Transcribe from './components/Transcribe';

import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(window.localStorage.getItem('token'))

  const handleFlaskCall = () => {
    fetch('http://localhost:5000',
    {
      method:'GET',
      mode:'cors'
    })
  }
  useEffect(() => {
    handleFlaskCall()
  },[])
  
    if(!isLoggedIn)
    {
      return (
      <div className="app-wrapper">
      <Router>
       <Header changeLoggedIn = {setIsLoggedIn} hasLoggedIn = {isLoggedIn}/>
        <Routes>
          <Route exact path= "/" element={<Auth changeLoggedIn = {setIsLoggedIn}/>}/>
          {/* <Route exact path= "/translate" element={<Transcribe/>}/> */}
        </Routes>
       {/* <Main/> */}
       </Router>
    </div>
    );
    }

    else
    {
        return (
      <div className="app-wrapper">
      <Router>
       <Header changeLoggedIn = {setIsLoggedIn} hasLoggedIn = {isLoggedIn}/>
        <Routes>
          <Route exact path= "/" element={<Transcribe changeLoggedIn = {setIsLoggedIn}/>}/>
          {/* <Route exact path= "/translate" element={<Transcribe/>}/> */}
        </Routes>
       {/* <Main/> */}
       </Router>
    </div>
    );
    }
  
    
}

export default App;
