import { ButtonPrimary } from '../Button/ButtonPrimary'
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
        <h3>Alterar task</h3>
        <form id='taskForm'>
          <div className="formField">
            <label>Titulo</label>
            <input type='text' placeholder="Digite um título" onChange={title} defaultValue={valueTitle}/>
          </div>
          <div className="formField">
            <label>Descrição</label>
            <textarea type='text' placeholder="Digite uma descrição" onChange={description} defaultValue={valueDescription}/>
          </div>
          <ButtonPrimary type='submit' onClick={submit} text='Alterar' />
        </form>
      </div>
    </div>
  )
}
