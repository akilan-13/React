import './App.css';
import Navbar from './Component/Navbar/Navbar';
import { useState,useEffect } from 'react';
import SideBar from './Component/Sidebar/SideBar';
import {Routes,Route, json } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Hompage from './Component/Homepage/Hompage';
import Dashboard from './Component/Dashboard/Dashboard';
import Employees from './Component/Employees/Employees';
import LoginForm from './Component/LoginForm/LoginForm'
import { paginationRange } from './Utils/appUtils';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Stomp from 'stompjs'
import SockJS from 'sockjs-client';
import { set } from 'lodash';

function App() {
  const navigate=useNavigate();
  const [loading,setLoading]=useState(false)
  const [login,setLogin]=useState(false)
  const [showSideBar,setShowSidebar]=useState(false);
  const[loginUser,setLoginUser]=useState({})
 
  const[loginMessage,setLoginMessage]=useState(false)
  const [employees,setEmployees]=useState([])
  const [order,setOrder]=useState(null)
  const [modifiedRows,setModifiedRows]=useState({})

  const [columns,setColumns]=useState([
    { id:'name',title: 'name', visible: true, searchable:"",sort:null  },
    { id:'email',title: 'Email', visible: true, searchable:"",sort:null },
    { id:'gender',title: 'Gender', visible: true, searchable:"",sort:null },
    { id:'city',title: 'City', visible: true, searchable:"",sort:null },
    { id:'mobileNumber',title: 'Mobile Number', visible: true, searchable:"",sort:null}
  ])
  const[isModelOpen,setIsModelOpen]=useState(false)
  const[updateModelOpen,setUpdateModelOpen]=useState(false)
  const [newEmployee,setNewEmployee]=useState({name:"",email:"",gender:"",city:"",mobileNumber:""})
  const[searchText,setSearchText]=useState()
  const [sortDirection,setSortDirection]=useState(null)
  
  

  const [recordPerPage,setRecordPerPage]=useState(5)
  const[currentPage,setCurrentPage]=useState(1)

 const lastIndex=currentPage*recordPerPage;
 const firstIndex=lastIndex-recordPerPage;
 const currentRecord=employees.slice(firstIndex,lastIndex);
 const totalPages=Math.ceil(employees.length/recordPerPage)
 const pages=paginationRange(totalPages,currentPage,recordPerPage,1);
 const handlePageChange=(value)=>{
  if(value==="previous"  ){
    if(currentPage!==1){
      setCurrentPage(c=>c-1)
    }
  }
  else if(value==='...'){
    setCurrentPage(1)
  }
  else if(value==="next"){
    if( currentPage!==totalPages){
      setCurrentPage(c=>c+1)
    }
  }
  else{
    setCurrentPage(value)
  }

}

  function handleSidebar(){
    setShowSidebar(true)
  }
  function handleCloseIcon(){   
    setShowSidebar(false)
  }

  //get Employees from db

  const getEmployees= async()=>{
    setLoading(true)
  await axios.get(`http://localhost:7070/employee/api/getEmployees`).then((res)=>{
    const data=res.data;
    const reverse=data.reverse()
    setEmployees(reverse);
    return res.data;
    
  }).catch((err)=>{
    window.alert("error while fetching data from database !")
    console.log(err)
   
  })
 
   setLoading(false)
  }

  // update employee and add employee
  const handleAdd=()=>{
    setNewEmployee({name:"",email:"",mobileNumber:"",gender:"",city:""})
    setIsModelOpen(true)
    }
  const handleUpdate=(employee)=>{
      setNewEmployee(employee)
      setUpdateModelOpen(true)
    }
  const handlecloseModal=()=>{
    setIsModelOpen(false)
    setUpdateModelOpen(false)
    }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(newEmployee._id){
      setLoading(true)
      try{
        await axios.put(`http://localhost:7070/employee/api/update/${newEmployee._id}`,newEmployee)
        setUpdateModelOpen(false)
        getEmployees()
        setLoading(false)
      }
      catch(err){
        console.log(err)
        setLoading(false)
      }
    }
    else{
      setLoading(true)
      try{
        await axios.post('http://localhost:7070/employee/api/addEmployee',newEmployee);
        setIsModelOpen(false)
        getEmployees()
        setLoading(false)
      }
      catch(err){
        console.log(err)
        setLoading(false)
      }
    }
}

const handleDelete=(id)=>{
  const confirm=window.confirm("are you sure you want to delete this employee details ?")
  if(confirm){
    setLoading(true)
      try{
        axios.delete( `http://localhost:7070/employee/api/deleteEmployee/${id}`)
        getEmployees()
        setLoading(false)
      }
      catch(err){
        console.log(err)
        setLoading(false)
      }
      getEmployees()
  } 
}

 
//search and getemployees during changes
useEffect(() => { 
  try{
    const socket=new SockJS("http://localhost:7070/ws")
    socket.onopen = () => console.log('WebSocket connected');
    const client=Stomp.over(socket)
  client.connect({},()=>{
    console.log('Connected to WebSocket');
    client.subscribe('/topic/updates', (message) => {
      const updateEmployees=JSON.parse(message.body)
      getEmployees();
      handleDbUpdates(updateEmployees)
      console.log(updateEmployees)
     
     
    })
  })
  }
  catch(err){
    window.alert("error from server problem :",err)
    console.log(err)
  } 
  getEmployees()

},[]);

const handleDbUpdates=(updateMessage)=>{
  const entity=updateMessage.payload;
  const action =updateMessage.message;
  let updateData=[...employees];

  if(action==="add"){
    updateData=[...employees,entity]
  }
  else if(action==="update"){
   updateData= updateData.map(employee=>employee._id===entity._id?entity:employee)
  }
  setModifiedRows({...modifiedRows,"id":entity._id,"action":action})
  console.log(modifiedRows)
  setEmployees(updateData);
  setTimeout(()=>{
    setModifiedRows({"id":"","action":""})
  },6000)
  
 
}

const handleSearch=(index,value,col)=>{
  const newColumn=[...columns]
  newColumn[index].searchable=value;
  setColumns(newColumn)
  const searchValue=columns[index].searchable;
    console.log(searchValue)

    if(searchValue.trim()===""){
      getEmployees()
    } 
    else{
      const newFilterData=employees.filter(employee=>col.visible && employee[col.id].toLowerCase().includes(searchValue.toLowerCase()))
      setEmployees(newFilterData)
      setCurrentPage(1)
    }
   
}



//sort
const handleSort=(index,column)=>{
  const newColumn=[...columns]
  const sortedData=[...employees]
  if(column.sort===null){
    newColumn[index].sort="asc"
    setColumns(newColumn)
    sortedData.sort((a,b)=>a[column.id]<b[column.id] ? -1:1)
    setEmployees(sortedData)
  }
  else if(column.sort==="asc"){
    newColumn[index].sort="dsc"
    setColumns(newColumn)
    sortedData.sort((a,b)=>a[column.id]>b[column.id] ? -1:1)
    setEmployees(sortedData)
  }
  else{
    newColumn[index].sort=null;
    setColumns(newColumn)
    const data=getEmployees();
    console.log(data)
  }
}



//login authentication
useEffect(()=>{
    
  if(localStorage.getItem("authentication")){
    setLoading(true)
    setLogin(true)
    const storedUsers=localStorage.getItem("loginUser")
    setLoginUser(JSON.parse(storedUsers))
    setLoading(false)
    navigate("/")
  }
  else if(!localStorage.getItem("authentication")){
    setLoading(true)
    setLogin(false)
    setLoading(false)
    navigate("/")  
}
},[login])
const handleLogout=()=>{
  setLoading(true)
  localStorage.removeItem("authentication")
  localStorage.removeItem("loginUser")
  localStorage.removeItem("user")
  setLogin(false)
  setShowSidebar(false)
  setLoading(false)
  navigate("/")
}
const userName=loginUser.fullName;

const handleEmployee=(e)=>{
  setNewEmployee({...newEmployee,[e.target.name]:e.target.value})
}


const handleDragStart = (e, index) => {
  e.dataTransfer.setData('index', index.toString());

};

const handleDragOver = (e) => {
  e.preventDefault();
};

const handleDrop = (e, newIndex) => {
  const draggedIndex = parseInt(e.dataTransfer.getData('index'));
  const updatedColumns = [...columns];
  const draggedColumn = updatedColumns[draggedIndex];

  // Remove item from old index
  updatedColumns.splice(draggedIndex, 1);
  // Insert item at new index
  updatedColumns.splice(newIndex, 0, draggedColumn);
  console.log(updatedColumns)
  setColumns(updatedColumns);
};
const handleColumnVisibility=(index)=>{
  const newColumns=[...columns];
  newColumns[index].visible=!newColumns[index].visible;
  setColumns(newColumns)
}

  return (
    <div className="App ">
      <div className='header'>
      <Navbar loginUser={loginUser} login={login} handleLogout={handleLogout}/>
      </div>
      <ToastContainer/>
      {login && <div className='bar'>
        {showSideBar ? <span onClick={handleCloseIcon}><IoClose /></span>:<span onClick={handleSidebar}><FaBars /></span> }
</div>} 
      <div className='main d-flex '>
      {login && showSideBar && 
          <div className={`sidepanel`}>
          <SideBar showSideBar={showSideBar} userName={userName}/>
        </div>
      
      } 
      <div className="container">
        <Routes>
          <Route path='/' element={<Hompage/>}/>
          <Route path='/dashboard' element={<Dashboard loginUser={loginUser}/>}/>
          <Route path='/employees' element={<Employees modifiedRows={modifiedRows} handleSearch={handleSearch} handleColumnVisibility={handleColumnVisibility} handleDrop={handleDrop} handleDragOver={handleDragOver} handleDragStart={handleDragStart} setColumns={setColumns} columns={columns} loginUser={loginUser}  order={order} loading={loading} handleAdd={handleAdd} handleUpdate={handleUpdate} handlecloseModal={handlecloseModal} updateModelOpen={updateModelOpen} isModelOpen={isModelOpen} handleDelete={handleDelete} handleSubmit={handleSubmit} setSearchText={setSearchText} searchText={searchText} handleSort={handleSort} sortDirection={sortDirection} pages={pages} setRecordPerPage={setRecordPerPage} currentRecord={currentRecord} employees={employees} recordPerPage={recordPerPage}   currentPage={currentPage}  handlePageChange={handlePageChange}  newEmployee={newEmployee} handleEmployee={handleEmployee} />} />
          <Route path='/login' element={<LoginForm loginMessage ={loginMessage} setLoginMessage ={setLoginMessage} setLogin={setLogin} navigate={navigate} setLoginUser={setLoginUser} />}/>
        </Routes>
      </div>
      </div>
    </div>
  );
}

export default App;
