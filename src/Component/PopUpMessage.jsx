import React from 'react'

const PopUpMessage = ({modifiedRows}) => {
  return (
    <div className={`pop-up`}>
        <div className={`pop-up-container d-flex flex-column justify-content-center ${modifiedRows.action ?"popup-show":""} `} >
            <h4 className='mx-3'>new message ...</h4>
            <p className='mx-5 '>{modifiedRows.action} a {modifiedRows.action==="add"?"new" :""} Employee in DataBase</p>
        </div>
    </div>
  )
}

export default PopUpMessage