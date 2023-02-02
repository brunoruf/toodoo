import React, { useState } from 'react'
import './modal.css'

function fechaModal() {
    const modal = document.querySelector(".modalUpdate")
    modal.classList.remove('active')
  }


export const ModalUpdate = ({title, description, submit, valueTitle, valueDescription}) => {

  return (
    <div className="modalUpdate">
      <div className="novaTask">
        <span className="close" onClick={() => fechaModal()}>X</span>
        <h3>Nova task</h3>
        <form>
          <div className="formField">
            <label>Titulo</label>
            <input type='text' placeholder="Digite um título" onChange={title} defaultValue={valueTitle} />
          </div>
          <div className="formField">
            <label>Descrição</label>
            <textarea type='text' placeholder="Digite uma descrição"  onChange={description} defaultValue={valueDescription}/>
          </div>
          <button type='submit' onClick={submit}>Cadastrar</button>
        </form>
      </div>
    </div>
  )
}
