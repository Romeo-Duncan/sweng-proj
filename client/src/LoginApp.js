import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import {useState} from 'react'

import UserService from './Services/UserService.js'
import CustommerApp from './CustomerApp.js'
import EmployeeApp from './EmployeeApp.js'
import AdminApp from './AdminApp.js'

import "./LoginApp.css"

function LoginComponent(props){
  const [isLoginInfoWrong, setIsLoginInfoWrong] = useState(false)
  const [isUsernameEmpty, setIsUsernameEmpty] = useState(false)
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false)

  function onFieldChanged(){
    const username = document.getElementById("username-field").value
    const password = document.getElementById("password-field").value

    setIsUsernameEmpty(username.length > 0)
    setIsPasswordEmpty(password.length > 0)
    setIsLoginInfoWrong(false)
  }

  function onLogInRequested(){
      const username = document.getElementById("username-field").value
      const password = document.getElementById("password-field").value  
      
      if (username.length === 0 || password.length === 0) {return}

      UserService.verifyLoginRequest(username, password)
      .then(data => {
        if (data.userType){
          props.onLoggedIn(data.userType)
        }else{
          setIsLoginInfoWrong(true)
        }
      })
  }    

  return (    
    <>
      {props.userType === "Admin" && <Navigate to='/admin'/>} 
      {props.userType === "Employee" && <Navigate to='/employee'/>} 
      {props.userType === "Customer" && <Navigate to='/customer'/>} 

      <div className = "log-in-container position-absolute top-50 start-50 translate-middle">
        <div className='mt-5'>
        <div className = "fs-4 heading-container">
            Sign In
        </div>        
        <div className = "mb-3">
            <input 
                class = "log-in-field" 
                id = "username-field" 
                placeholder = "Username" 
                autocomplete="off"
                onChange = {onFieldChanged}
            />                                       
        </div>
        <div>
            <input 
                class = "log-in-field" 
                id = "password-field" 
                placeholder = "Password"
                type="password"
                onChange = {onFieldChanged}
            />   
        </div>  
        
        <div class = "log-in-button-container">
          <div class = "feedback-container">
              {
                (isLoginInfoWrong && <>ERROR INVALID USERNAME OR PASSWORD</>)
                || (!isUsernameEmpty && !isPasswordEmpty && <>*username and password fields are empty</>)
                || (!isUsernameEmpty && <>*username field is empty</>)
                || (!isPasswordEmpty && <>*password field is empty</>)       
              }              
          </div> 
          <button class="log-in-button noto-font weight-900 " onClick={onLogInRequested} >CONTINUE</button>
        </div>         
        </div>             
      </div>
    </>   
  )
}

function LogoutComponent(props){
  return (
    <>
      {
        !props.userType &&  <Navigate to='/'/>
      }
      <div class="container mb-5">
        <button class="log-out-button" onClick={props.onLoggedOut} >SIGN OUT</button>
      </div>      
    </>
  )
}

function LoginApp() {
  const [userType, setUserType] = useState(sessionStorage.getItem("userType") || null)

  function onLoggedIn(userType){
    sessionStorage.setItem("userType", userType)
    setUserType(userType)
  }

  function onLoggedOut(){
    sessionStorage.setItem("userType", null)
    setUserType(null)
  }
  
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<LoginComponent onLoggedIn = {onLoggedIn} userType = {userType}/>}/>                     
          <Route path='admin' element={<><LogoutComponent onLoggedOut = {onLoggedOut} userType = {userType}/><AdminApp/></>}/>
          <Route path='employee' element={<><LogoutComponent onLoggedOut = {onLoggedOut} userType = {userType}/><EmployeeApp/></>}/>
          <Route path='customer' element={<><LogoutComponent onLoggedOut = {onLoggedOut} userType = {userType}/><CustommerApp/></>}/>
        </Routes>        
      </div>
    </Router>
  )
}

export default LoginApp;