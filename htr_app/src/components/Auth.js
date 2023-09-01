import React, { useState} from 'react'
// import {useNavigate} from 'react-router-dom'


import '../styles/auth.css'

import rightArrow from '../images/arrow-right.svg'
import googleLogo from '../images/google-logo.svg'

const Auth = ({changeLoggedIn}) => {

  const [loginState,setLoginState] = useState("Login")
  return(
    <div className="auth-container">
      {loginState === "Login"?<Login changeLoginState = {setLoginState} changeLoggedIn={changeLoggedIn}/>:<Register changeLoginState = {setLoginState} changeLoggedIn={changeLoggedIn}/>}
    </div>
  )
}

const Login = ({changeLoginState,changeLoggedIn}) => {
  const [userLoginInfo,setUserLoginInfo] = useState({})
  const [errorMessage,setErrorMessage] = useState('')


  const handleUserLogin = () => {
    fetch('http://127.0.0.1:4090/api/v1/login',{
      method: 'POST',
      body: JSON.stringify(userLoginInfo),
      headers:{
        'Content-Type':'application/json'
      },
      mode: 'cors'})
    .then(data => data.json())
    .then(resp => {console.log(resp);
      if(resp.data.token)
      {
        window.localStorage.setItem('token',resp.data.token);
        changeLoggedIn(true)
      }
      else if(resp.errorMessage)
      {
        setErrorMessage(resp.errorMessage)
      }

      })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  return (
    <div className="auth-wrapper">
        <div className="auth-head">
            <div className="ah_1">Login to Your Account</div>
            <div className="ah_2">Turn your handwritten notes into digital text with this powerful handwriting recognition engine.</div>
        </div>

        <div className="auth-body">
          <div className="auth-body-left">
            <div className="auth-input-container">
              <input type="text" className="username-inp" placeholder='Username' onChange={(e) => setUserLoginInfo({...userLoginInfo,username:e.target.value})} value={userLoginInfo.username}/>
            </div>

            <div className="auth-input-container">
              <input type="text" className="password-inp" placeholder='Password' onChange={(e) => setUserLoginInfo({...userLoginInfo,password:e.target.value})} value={userLoginInfo.password}/>
            </div>

            <div className="error-message">
              {errorMessage}
            </div>

            <div className="login-btn" onClick={() => {console.log(userLoginInfo);handleUserLogin()}}> 
              <span>
                Login to Your Account
              </span>

              <span><img src={rightArrow} alt="right_arrow" /></span>
            </div>
          </div>

          <div className="auth-body-divisor">
            <span>/</span>
          </div>
          <div className="auth-body-right">
              <img src={googleLogo} alt="" />
              <div className="sign-google-container">
                Sign in with Google
              </div>
          </div>
        </div>

        <div className="forgot-password">
          <div>Forgot Password?</div>
          <div>Dont Have An Account? <span onClick={() => changeLoginState('Register')}>Sign Up</span></div>
        </div>
    </div>
  )
}

const Register = ({changeLoginState,changeLoggedIn}) => {
  // const navigate = useNavigate()
  const [userRegisterInfo,setUserRegisterInfo] = useState({})
  const [errorMessage,setErrorMessage] = useState('')


  const handleUserRegister = () => {
    fetch('http://127.0.0.1:4090/api/v1/register',{
      method: 'POST',
      body: JSON.stringify(userRegisterInfo),
      headers:{
        'Content-Type':'application/json'
      },
      mode: 'cors'})
    .then(data => data.json())
    .then(resp => {console.log(resp);
      if(resp.data.token)
      {
        changeLoginState('Login')
        // window.localStorage.setItem('token',resp.data.token);
        // changeLoggedIn(true)
      }
      else if(resp.errorMessage)
      {
        setErrorMessage(resp.errorMessage)
      }
      })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  return (
    <div className="auth-wrapper">
        <div className="auth-head">
            <div className="ah_1">Register Your Account</div>
            <div className="ah_2">Turn your handwritten notes into digital text with this powerful handwriting recognition engine.</div>
        </div>

        <div className="auth-body">
          <div className="auth-body-left">
            <div className="auth-input-container">
              <input type="email" className="email-inp" placeholder='Email' onChange={(e) => setUserRegisterInfo({...userRegisterInfo,email:e.target.value})} value={userRegisterInfo.email}/>
            </div>
            <div className="auth-input-container">
              <input type="text" className="username-inp" placeholder='Username' onChange={(e) => setUserRegisterInfo({...userRegisterInfo,username:e.target.value})} value={userRegisterInfo.username}/>
            </div>

            <div className="auth-input-container">
              <input type="text" className="password-inp" placeholder='Password' onChange={(e) => setUserRegisterInfo({...userRegisterInfo,password:e.target.value})} value={userRegisterInfo.password}/>
            </div>

            <div className="error-message">
              {errorMessage}
            </div>

            <div className="login-btn" onClick={(e) => {console.log(userRegisterInfo);handleUserRegister()}}>
              <span>
                Register Your Account
              </span>

              <span><img src={rightArrow} alt="right_arrow" /></span>
            </div>
          </div>

        </div>

        <div className="forgot-password">
          <div></div>
          <div>Already Have An Account? <span onClick={() => changeLoginState('Login')}>Login</span></div>
        </div>
    </div>
  )
}

export default Auth