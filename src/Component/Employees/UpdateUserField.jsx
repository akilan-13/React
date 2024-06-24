import React from 'react'

const UpdateUserField = (props) => {
  return (
    <div className='ismodal'>
                <div className='container'>
                  <span onClick={props.handlecloseModal} >&times;</span>
                <h3 className='mt-2'>Update User</h3>  
                <form className='mt-4' onSubmit={props.handleSubmit} method='POST'>
                  <label>Name</label>
                  <input name='name' value={props.employee.name} onChange={props.handleEmployee}  className='d-block'/>
                  <label>Email</label>
                  <input name='email' type='email' value={props.employee.email} onChange={props.handleEmployee} className='d-block'/>
                  <label>Gender</label>
                  <input name='gender' value={props.employee.gender} onChange={props.handleEmployee} className='d-block'/>
                  <label>city</label>
                  <input name='city' value={props.employee.city} onChange={props.handleEmployee} className='d-block'/>
                  <label>Mobile Number</label>
                  <input name='mobileNumber' type='tel' value={props.employee.mobileNumber} onChange={props.handleEmployee} className='d-block'/>
                  <button className='btn bg-primary text-light me-3 my-2'>update</button>
                </form>
                </div>
             </div>
  )
}

export default UpdateUserField