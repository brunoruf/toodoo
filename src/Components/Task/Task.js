import React from 'react'
import { ButtonSecondary } from '../Button/ButtonSecondary';
import './Task.css';



export const Task = ({id, title, description, handleDelete, openModal, checked, setChecked, classes}) => {

  return (
    <>
        <li className={classes} id={id}>
            <div className='taskInfos'>
              <div>
                <input className='taskCheckbox' id= {id} type='checkbox' defaultChecked={checked} onClick={setChecked}></input>
                <h4 className={`taskTitle-${id}`}>{title}</h4>
              </div>
              {description.length !== 0 && <div className='divisoria'></div>}
              <p className={`taskDescription-${id} taskDescription`}>{description}</p>    
            </div>
            <div className='taskEvents'>
                <ButtonSecondary onClick={openModal} text='Alterar' />
                <ButtonSecondary onClick={handleDelete} text='Deletar' action='delete'/>
            </div>
        </li>
    </>
  )
}
