import { Task } from "./Components/Task/Task";
import './App.css'
import { useEffect, useState } from "react";
import { Modal} from "./Components/Modal/Modal";
import { ModalUpdate} from "./Components/Modal/ModalUpdate";


const url = 'http://localhost:1337/api/tasks'
const url2 = 'http://localhost:1337/api/tasks'
const token = 'c063a7ab0318621f6e030594db9c81fd585131fd8dc44abd6d502ed1ccf16dd32734a96bebd67d305f071864da3ae11e8a7c60de5df0b39117bf3cd24a4a2e6f3d01ad86ff583d650ab8cd0e8b64643795f283d88c7c90a87e57e0915d7099195c809ebb4d4378a689f61627fbccdd97f6997d65c170a01572dd1658ba01534e'



function App() {


  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)


  //GET 
  useEffect(() => {
    setIsLoading(true)
    fetch(url, {
      method:'GET',
      headers: {
        'Authorization': 'bearer ' + token,
      }
    })
    .then(response => response.json())
    .then(json => setData(json.data))
    .then(setIsLoading(false))
    .catch(err => console.log(err))
  }, [])
  // GET Fim


  // POST dados
  const postTask = (item) => {
    fetch(url2, {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + token,
      },
      body: JSON.stringify({
        data: {
          title: item.title,
          description: item.description,
          completed: item.completed,
        } 
      })
    })
    .then(response => response.json())
    .then(window.location.reload())
    .catch(erro => console.log('Aconteceu um erro') + console.log(erro))
  }

    function handlePostTask(e) {
      e.preventDefault()
      postTask(newTask)
      closeModalNewTask()
    }
  // POST dados


  //UPDATE dados
  const updateTask = (item) => {

    fetch(`http://localhost:1337/api/tasks/${item.id}`, {
      method:'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + token,
      },
      body: JSON.stringify({
        data: {
          title: item.title,
          description: item.description,
          completed: item.completed,
        } 
      })
    })
    .then(response => response.json()
    .then(setTimeout(() => {document.location.reload()}, 100))
    .catch(erro => console.log('Aconteceu um erro') + console.log(erro)))
  }


  function handleUpdateTask(e) {
    e.preventDefault()
    updateTask(newTask)
    closeModalUpdateTask() 
  }
  // UPDATE dados fim
    
  // DELETE task inicio
  function handleDeleteTask(e, item) {
    e.preventDefault()
    deleteItem(item.id)
  }

  const deleteItem = (id) => {
    fetch(`http://localhost:1337/api/tasks/${id}`, {
      method:'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + token,
      },
    })
    .then(setTimeout(() => {document.location.reload()}, 100))
    .catch(erro => console.log('Aconteceu um erroooo') + console.log(erro))
  }
  // DELETE task fim


  // MODAL NOVA TASK
  function openModalNewTask() {
    const modal = document.querySelector(".modalNovo")
    modal.classList.add('active')
  }

  function closeModalNewTask() {
    const modal = document.querySelector(".modalNovo")
    modal.classList.remove('active')
  }
  //MODAL NOVA TASK fim

  
  //CHECKBOX
  function handleSetCompleted(e) {
    const id = e.target.parentNode.parentNode.id;
    let isCompleted
  
    if (e.target.checked) {
      isCompleted = true;
    } else {
      isCompleted = false;
    }
  
    const task = {
      id: id,
      completed: isCompleted,
    };
  
    return updateTask(task);
  }
  
  //CHECKBOX fim


  //MODAL UPDATE TASK
  function openModalUpdateTask(e) {
    const modal = document.querySelector(".modalUpdate")
    modal.classList.add('active')
    const id = e.target.parentNode.parentNode.id
    const taskTitleSelect = document.querySelector(`.taskTitle-${id}`)
    const taskTitle = taskTitleSelect.textContent
    const taskDescriptionSelect = document.querySelector(`.taskDescription-${id}`)
    const taskDescription = taskDescriptionSelect.textContent
    setId(id)
    setTitle(taskTitle)
    setDescription(taskDescription)
  }

  function closeModalUpdateTask() {
    const modal = document.querySelector(".modalUpdate")
    modal.classList.remove('active')
  }
  //MODAL UPDATE TASK fim


  
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [id, setId] = useState('')
  const [completed, setCompleted] = useState(false)

  const newTask = {
    id:id,
    title: title,
    description: description,
    completed: completed,
  }




    return ( 
      <>
      <Modal title={(a) => setTitle(a.target.value)} description={(a) => setDescription(a.target.value)} submit={(e) => handlePostTask(e)} />
      <ModalUpdate title={(a) => setTitle(a.target.value)} description={(a) => setDescription(a.target.value)} valueTitle={title} valueDescription={description} submit={(e) => handleUpdateTask(e)} />
        <div className="title">
          <h1>To-do-list</h1>
          <button onClick={() => openModalNewTask()}>Nova Task</button>
        </div>
        <h2>A fazer</h2>
        {data.map(item => item.attributes.completed===false && <Task key={item.id} id= {item.id} title={item.attributes.title} description={item.attributes.description} handleDelete={(e) => handleDeleteTask(e, item)} openModal={(e) => openModalUpdateTask(e)}  setChecked={(e) => handleSetCompleted(e)} /> )}
        <h2 className="tasksFinalizadas">Finalizadas</h2>
        <div className="finalizadas">
        {data.map(item => item.attributes.completed===true && <Task key={item.id} id= {item.id} title={item.attributes.title} description={item.attributes.description} handleDelete={() => deleteItem(item.id)} openModal={(e) => openModalUpdateTask(e)} checked={true} setChecked={(e) => handleSetCompleted(e)} />)}
        </div>
      </>
    );
}

export default App;
