import React, { useState } from 'react'
import {phoneValidation,emailValidation,passwordValidation} from '../../Utils/appUtils'
import "./LoginForm.css"
import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';
import axios from "axios"
import 'react-toastify/dist/ReactToastify.css';
import {  Bounce, toast } from 'react-toastify';

const LoginForm = ({loginMessage,setLoginMessage,setLogin,navigate}) => {

  
  const[loginShow,setLoginShow]=useState(true);
  const [showMessage,setShowMessage]=useState('')
 
  const[user,setUser]=useState([{fullName:"",emailId:"",role:"",password:"",mobileNumber:""}])
  const [errorMesage,setErrorMessage]=useState('')

const handleChange=(e)=>{
setUser({...user,[e.target.name]:e.target.value})
}
const handleLogin=()=>{
  setErrorMessage("")
  setLoginShow(true)
}



function formSubmit(){
  if(!emailValidation(user.emailId)) return setErrorMessage("Enter Email Id *")
  if(!passwordValidation(user.password)) return setErrorMessage("Password should have minimum 8 characters with combination of digit, upperCase, lowerCase, special character*")
  if(!phoneValidation(user.mobileNumber)) {return setErrorMessage("Enter Invalid Number *")}
 
else{
  setErrorMessage("")
  registerUser()
}

}

const registerUser=async()=>{
  try{
    const res=await axios.post("http://localhost:5080/signup",user);
    console.log(res.data)
    setLoginShow(true);
    toast.success("Register Successfully",{
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition : Bounce
    })
    
  
  }
 
  catch(err){
    console.log(err.response.data.error)
  
      setErrorMessage(err.response.data.error)
       setLoginShow(false)
  
  }
  
}

 
 
  return (
    <>
   <div className='form'>
    <div className="container">
    <div className="close">
      <Link to="/"><IoClose/></Link>
    </div>
      {loginShow ? 
      <Login setLoginShow={setLoginShow} setUser={setUser} errorMesage={errorMesage} setErrorMessage={setErrorMessage} showMessage={showMessage} setShowMessage={setShowMessage} loginMessage={loginMessage} setLoginMessage={setLoginMessage} setLogin={setLogin} navigate={navigate} /> :
      <form className=' signupForm' onSubmit={(e)=>e.preventDefault()}>
      <h2>Create Account</h2>
      {errorMesage && <div className='error text-danger'>{errorMesage}</div>}

     
      <div className=" inp name">
          <input type="text" name="fullName" id="name" value={user.fullName} onChange={handleChange}  required/>
              <label htmlFor="name">Full Name</label>
          </div>
          <div className=" inp userName">
          <input type="text" name="emailId" id="uName" value={user.emailId} onChange={handleChange}  required/>
              <label htmlFor="uName">Email Id</label>
          </div>
          <div className=" inp password">
              <select name="role" id="role" value={user.role} onChange={handleChange}>
                <option value="client">Client</option>
                <option value="admin">Admin</option>
              </select>
          </div>
          <div className=" inp password">
              <input type="password" name="password" id="password" value={user.password} onChange={handleChange}  required/>
              <label htmlFor="password">Password</label>
          </div>
          <div className="inp mobile">
              <input type="tel" name="mobileNumber" id="mobile" value={user.mobileNumber} onChange={handleChange} required/>
              <label htmlFor="mobile">Mobile No</label>
          </div>
          <button onClick={formSubmit}>SignUp</button>
          <p> Already you have Account Please <span onClick={handleLogin}>Login</span> </p>

      </form>
    }
    </div>
  </div>
  </>
   
  )
}

const Login=({errorMesage,setErrorMessage,setUser,setLoginShow,setShowMessage,showMessage ,loginMessage,setLoginMessage ,navigate ,setLogin})=>{

  const [userInput,setUserInput]=useState({emailId:"",password:""});
  const [admin,setAdmin]=useState(false)
 function handleLogin(){
  setShowMessage('')
  if(!emailValidation(userInput.emailId)) return setErrorMessage("Enter Invalid username or Email Id *")
  if(!passwordValidation(userInput.password)) return setErrorMessage("Password should have minimum 8 characters with combination of digit, upperCase, lowerCase, special character*")
  else{
    login();  
    setUserInput({emailId:"",password:""})   
  }
 }
 const successLogin=()=>toast.success("Login Successfully ", {
  position: "top-center",
  autoClose: 1000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition : Bounce
  });
 const login=async()=>{
  try{
    const response=await axios.post("http://localhost:5080/login",userInput)
    const user=response.data.data;

    setLogin(true);
    localStorage.setItem("loginUser",JSON.stringify(user))
    localStorage.setItem("authentication",true)
    localStorage.setItem("user"
    ,user.fullName)
    navigate("/")
    successLogin()
  }
  catch(err){
if(err.code==="ERR_BAD_REQUEST"){
  setErrorMessage("Invalid email or Password")
} 
  }
  
 }

  function handleSignup(){
    setUser({fullName:"",emailId:"",password:"",mobileNumber:""})
    setErrorMessage("")
    setLoginShow(false)
  }
const handleLoginChange=(e)=>{
  const{name,value}=e.target
    setUserInput({...userInput,[name]:value})
  }


  return(<div>

     <form className=' loginForm' onSubmit={(e)=>e.preventDefault()}>
        <h2>Login</h2>  
        {errorMesage && <div className='error text-danger'>{errorMesage}</div>}
            
               <div className=" inp userName">
                <input type="text" name="emailId" id="emailId"value={userInput.emailId} onChange={handleLoginChange} required/>
                <label htmlFor="emailId">UserName or Email Id</label>
            </div>
            <div className=" inp password">
                <input type="password" name="password" id="password" value={userInput.password} onChange={handleLoginChange} required/>
                <label htmlFor="password">Password</label>
            </div> 
           
            <button onClick={handleLogin}>Login</button>
            <p> If you don't have Account, Please your <span onClick={handleSignup}>Create Account</span> </p>
        </form>
        
  </div>)
}


export default LoginForm
