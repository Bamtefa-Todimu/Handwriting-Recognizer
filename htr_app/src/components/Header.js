import React, { useEffect } from 'react'

// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../styles/header.css'

const Header = ({changeLoggedIn,hasLoggedIn}) => {

    useEffect(()=>{
        console.log(hasLoggedIn);
    },[hasLoggedIn])
  return (
    <div className='header-wrapper'>
        <div className="logo-section">
            <div className="logo">
                ScribeX
            </div>
        </div>

        <div className="links-section">
            {!hasLoggedIn?null:
                <>
                <div className="trans_link">Transcribe</div>
                {/* <div className="history_link">History</div> */}
                </>
            
            }
        </div>

        <div className="logout-section">
            <div className="logout-btn" onClick={() => {window.localStorage.removeItem('token');changeLoggedIn(false)}}>
                {!hasLoggedIn?"Get Started":"Logout"}
            </div>
        </div>
        
    </div>
  )
}

export default Header