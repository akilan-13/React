import React from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom'

const Navbar = (props) => {
  return (
    <div className='dashboard'>
    <div className="navbar">
          
    <span className='logo '>Akil Mates</span>
      <ul className=''>
        {props.login?
         <li className='logout bold' onClick={props.handleLogout}>Logout</li>
         : <Link className='list bold ' to='/login'>Login</Link>  
      }
      </ul>
    </div>
   
</div>
  )
}

export default Navbar