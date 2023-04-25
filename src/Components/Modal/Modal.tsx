import { ButtonPrimary } from '../Button/ButtonPrimary'
import './modal.css'

interface ModalProps {
  title: (event: React.ChangeEvent<HTMLInputElement>) => void;
  description?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  submit?: (event: React.FormEvent<HTMLButtonElement>) => void;
}

function fechaModal() {
    const modal = document.querySelector(".modalNovo")!
    modal.classList.remove('active')
  }

export const Modal = ({title, description, submit}:ModalProps) => {

  return (
    <div className="modalNovo">
      <div className="novaTask">
        <span className="close" onClick={() => fechaModal()}>X</span>
        <h3>Nova task</h3>
        <form>
          <div className="formField">
            <label>Titulo</label>
            <input type='text' placeholder="Digite um título" onChange={title}/>
          </div>
          <div className="formField">
            <label>Descrição</label>
            <textarea placeholder="Digite uma descrição" onChange={description}/>
          </div>
          <ButtonPrimary type='submit' onSubmit={submit} text='Cadastrar' />
        </form>
      </div>
    </div>
  )
}
