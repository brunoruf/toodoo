import React from 'react'
import './Task.css';



export const Task = ({id, title, description, handleDelete, openModal, checked, setChecked}) => {

  return (
    <>
        <div className='taskContainer' id={id}>
            <div className='taskInfos'>
              <div>
                <input id= {id} type='checkbox' defaultChecked={checked} onClick={setChecked}></input>
                <h4 className={`taskTitle-${id}`}>{title}</h4>
              </div>
              {description.length !== 0 && <div className='divisoria'></div>}
              <p className={`taskDescription-${id} taskDescription`}>{description}</p>       
            </div>
            <div className='taskEvents'>
                <button onClick={openModal}>Alterar</button>
                <button onClick={handleDelete}>Deletar</button>
            </div>
        </div>
    </>
  )
}
