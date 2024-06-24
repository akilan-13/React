import React from 'react'

const AddUserField = (props) => {
  return (
    <div className='ismodal'>
         <div className='container p-5'>
                  <span onClick={props.handlecloseModal} >&times;</span>
                <h3 className=''>User Details</h3>
                <form className='' onSubmit={props.handleSubmit} method='POST'>
                  <div className="name">
                    <label >Name</label>
                    <input type="text" id='name' value={props.employee.name} onChange={props.handleEmployee}  name='name' required />
                  </div>
                  <div className="email">
                    <label >Email id</label>
                    <input type="email" name="email" value={props.employee.email} onChange={props.handleEmployee} id="email" required/>
                  </div>
                  <div className="gender">
                    <label >Gender</label>
                    <input type="text" name='gender' value={props.employee.gender} onChange={props.handleEmployee} id='gender'/>
                  </div>
                  <div className="city">
                    <label >City</label>
                    <input type="text" name='city' value={props.employee.city} onChange={props.handleEmployee}  id='city' />
                  </div>
                  <div className="mobile">
                    <label >Mobile Number</label>
                    <input type="tel" name="mobileNumber" value={props.employee.mobileNumber} onChange={props.handleEmployee}  id="mobile" required />
                  </div>
                  <button className='btn bg-success text-light mt-2' >Add Employee</button>
                </form>
                </div>

    </div>
  )
}

export default AddUserField