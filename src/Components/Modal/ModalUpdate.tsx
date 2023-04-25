import { ButtonPrimary } from '../Button/ButtonPrimary'
import './modal.css'

interface ModalUpdateProps {
  title: (event: React.ChangeEvent<HTMLInputElement>) => void;
  description?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  submit?: (event: React.FormEvent<HTMLButtonElement>) => void;
  valueTitle: string;
  valueDescription: string;
}

function fechaModal() {
    const modal = document.querySelector(".modalUpdate")!
    modal.classList.remove('active')
  }


export const ModalUpdate = ({title, description, submit, valueTitle, valueDescription}:ModalUpdateProps) => {

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
            <textarea placeholder="Digite uma descrição" onChange={description} defaultValue={valueDescription}/>
          </div>
          <ButtonPrimary type='submit' text='Alterar' onSubmit={submit}/>
        </form>
      </div>
    </div>
  )
}
