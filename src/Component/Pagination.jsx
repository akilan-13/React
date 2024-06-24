import React from 'react'

const Pagination = (props) => {
  
  return (
    <div>
        <ul className='pagination pagination-md justify-content-center'>
            <li className='page-item'>
                <span className='page-link pg' onClick={()=>props.handlePageChange('previous')}>&laquo;</span>
            </li>
           {props.pages.map((pg,index)=>{
            if(pg===props.currentPage){
                return( <li className='page-item' key={index}>
                <span className='page-link currentpg' >{pg}</span>
            </li>)
            }
                else{
                    return( <li className='page-item'key={index}>
                    <span className='page-link pg'onClick={()=>props.handlePageChange(pg)}>{pg}</span>
                </li>)
                }
           })}
            <li className='page-item' >
                <span className='page-link pg' onClick={()=>props.handlePageChange('next')}>&raquo;</span>
            </li>
        </ul>
    </div>
  )
}

export default Pagination