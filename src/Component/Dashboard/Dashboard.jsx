import React from 'react'
import './Dashboard.css'
const Dashboard = (props) => {
  return (
    <div className='dashboard '>
         <div className='width-100  d-flex justify-content-center ' style={{height:'100%' }}>
        <div className=" d-flex flex-column gap-2 w-50 align-items-center mt-5 ">
            <img  className='userImage my-2 mt-5 rounded-circle'  src="https://th.bing.com/th/id/OIP.z4no5tqp2ryBdMMD5NU9OgHaEv?rs=1&pid=ImgDetMain" alt="/" />
            <div className="datail d-flex justify-content-center">
                <div className="div">
                <p>Name &ensp; &ensp;  &ensp;  &ensp;  &ensp; &nbsp;   : {props.loginUser.fullName}</p>
            <p>Email Id&ensp; &ensp;  &ensp;  &ensp;  &ensp; &nbsp; : {props.loginUser.emailId}</p>
            <p>Mobile Number &ensp;: {props.loginUser.mobileNumber}</p>
                </div>
            </div> 
        </div>
    </div>
    </div>
  )
}

export default Dashboard

