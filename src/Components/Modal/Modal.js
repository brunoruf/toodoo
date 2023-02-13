import './modal.css'

function fechaModal() {
    const modal = document.querySelector(".modalNovo")
    modal.classList.remove('active')
  }


export const Modal = ({title, description, submit}) => {



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
            <textarea type='text' placeholder="Digite uma descrição"  onChange={description}/>
          </div>
          <button type='submit' onClick={submit}>Cadastrar</button>
        </form>
      </div>
    </div>
  )
}
