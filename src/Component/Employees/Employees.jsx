import {Table} from 'react-bootstrap'
import AddUserField from './AddUserField'
import UpdateUserField from './UpdateUserField'
import Pagination from '../Pagination'
import "./Employee.css"
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import PopUpMessage from '../PopUpMessage'
const Employees = (props) => {
  console.log(props.modifiedRows)
  return (
    <div className=' employee mt-5 container emp-table'>

      {props.loginUser.role==="admin"
      &&
      <div className="search my-2">
            <button className='btn bg-success  text-light col-2' onClick={props.handleAdd} >Add Employee</button>
            </div>
      }
          
 
       <div className="sort-selection d-flex gap-4 my-2 ">
        <div className='mt-2'>
          <p>Data per Page &ensp;
            <select  className="px-1" onChange={(e)=>props.setRecordPerPage(e.target.value)} >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select> 
          </p>
        </div>

        <div className="total my-2">
          <h5>Total Employees : <span>{props.employees.length}</span></h5>
        </div>

       </div>
       <div className='d-flex gap-3 my-2'>
        {props.columns.map((col,index)=>(
          <label key={col.id} >
            <input type="checkbox" className='mx-1'
            checked={col.visible}
            onChange={()=>props.handleColumnVisibility(index)}
            />
            {col.title}
          </label>
        ))}
       </div>
    <div className="">
         <Table striped bordered hover responsive size='sm' className='table w-100 '>
            <thead className='position-relative text-center'>
            <tr className='w-100' >
              <th>S.No</th>
            {props.columns.map((column, index) => (
              column.visible && <th
                key={column.id}
                draggable
                onDragStart={(e) => props.handleDragStart(e, index)}
                onDragOver={props.handleDragOver}
                onDrop={(e) => props.handleDrop(e, index)}
              >
                <p>{column.title}</p>
                <span className="search_sort d-flex w-100 gap-2 justify-content-center">
                  <input type="text" className='px-2 py-1 border rounded'
                  value={column.searchable}
                  onChange={(e)=>props.handleSearch(index,e.target.value,column)}
                  placeholder={`search`}/>
                  <span value={props.order} className='mx-1 sortIcon' onClick={()=>props.handleSort(index,column)}>
                { column.sort ===null ?<FaSort/>:column.sort==="asc"?<FaSortDown/>:<FaSortUp/> } 
                  </span>
                </span>
              </th> 
            ))}
              {props.loginUser.role==="admin"&&
              <>
              <th>Edit</th>
              <th>Delete</th>
              </>
              }
            </tr>
            </thead>
            <tbody >
            {props.currentRecord.map((employee,index)=>{
             
                
                return(
                <tr className={`${props.modifiedRows.action==="add" && employee._id===props.modifiedRows.id?"table-success":props.modifiedRows.action==="update" && employee._id===props.modifiedRows.id?"table-danger":""}`} key={index}><td>{index+1+(props.currentPage-1)*props.recordPerPage}</td>
                    {props.columns.map((column)=>(column.visible && <td key={column.id}>{employee[column.id]}</td>))}
                    {props.loginUser.role==="admin" && <>
                      <th><button className='btn bg-success text-light' onClick={()=>props.handleUpdate(employee)}  >Edit</button></th>
                      <th><button  className='btn bg-danger text-light' onClick={()=>props.handleDelete(employee._id)}>Delete</button></th>
    </>}
                    
                </tr>
                )
               })}
            </tbody>
        </Table>
        <Pagination pages={props.pages} currentPage={props.currentPage} handlePageChange={props.handlePageChange}/>
        </div>
        
        {props.isModelOpen &&
                <AddUserField  handlecloseModal={props.handlecloseModal} handleSubmit={props.handleSubmit} employee={props.newEmployee} handleEmployee={props.handleEmployee}/>
             }
            {props.updateModelOpen &&
                <UpdateUserField  handlecloseModal={props.handlecloseModal} handleSubmit={props.handleSubmit} employee={props.newEmployee}  
                handleEmployee={props.handleEmployee}/>
             }
           
             <PopUpMessage modifiedRows={props.modifiedRows}/>
           
    </div>
  )
}

export default Employees