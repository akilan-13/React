import React, { useState } from 'react'
import './Sidebar.css'
import {Link}from "react-router-dom"
const SideBar = (props) => {  
  const [menu,setMenu]=useState("/")
  return (
      <div className= {`sidebar d-flex flex-column  ${props.showSideBar?'active':""}`} >
      <h3 className='mt-4 mx-2 px-2'>Hi {props.userName}  ✋</h3>
      <Link className={`link py-2 px-5 mt-2 ${menu==='/'?'active':''}`} onClick={()=>setMenu("/")} to="/">Home</Link>
      <Link className={`link  py-2 px-5  ${menu==='/dashboard'?'active':''}`} onClick={()=>setMenu("/dashboard")}  to="/dashboard">Dashboard</Link>
      <Link className= {`link  py-2 px-5  ${menu==='/employees'?'active':''}`} onClick={()=>setMenu("/employees")} to="/employees">Employees</Link>
      </div>

  )
}

export default SideBar