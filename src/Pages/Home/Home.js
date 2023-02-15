import { Task } from "../../Components/Task/Task";
import './Home.css'
import { useEffect, useState } from "react";
import { Modal} from "../../Components/Modal/Modal";
import { ModalUpdate} from "../../Components/Modal/ModalUpdate";
import { ButtonPrimary } from "../../Components/Button/ButtonPrimary";


const url = process.env.REACT_APP_BASE_URL
const token = process.env.REACT_APP_API_TOKEN

export const Home = () => {
    
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
    function openModalNewTask() {
      const modal = document.querySelector(".modalNovo")
      modal.classList.add('active')
    }

    function handlePostTask(e) {
      e.preventDefault()
      postTask(newTask)
      closeModalNewTask()
    }

    function postTask (item) {
      fetch(url, {
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

      function closeModalNewTask() {
        const modal = document.querySelector(".modalNovo")
        modal.classList.remove('active')
      }
    // POST dados
  
  
    //UPDATE dados
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

      function handleUpdateTask(e) {
      e.preventDefault()
      updateTask(newTask)
      closeModalNewTask()
    }
    // UPDATE dados fim
      
    // DELETE task
    function handleDeleteTask(e, item) {
      e.preventDefault()
      deleteItem(item.id)
    }
  
    function deleteItem(id) {
      fetch(`${url}/${id}`, {
        method:'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'bearer ' + token,
        },
      })
      .then(setTimeout(() => {document.location.reload()}, 100))
      .catch(erro => console.log('Aconteceu um erro -') + console.log(erro))
    }

    function updateTask(item) {
      fetch(`${url}/${item.id}`, {
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
    // DELETE task fim
  
  
    //CHECKBOX
    function handleSetCompleted(e) {
      const id = e.target.parentNode.parentNode.parentNode.id;
      let isCompleted
      e.target.checked ? isCompleted=true : isCompleted=false

      const task = {
        id: id,
        completed: isCompleted,
      }
      
      updateTask(task)
    }
    //CHECKBOX fim
  
    
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [id, setId] = useState('')
    const completed = false
  
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
            <h1>toodoo</h1>
            <ButtonPrimary onClick={() => openModalNewTask()} text='Nova Task'/>
          </div>
          <h2>A fazer</h2>
          <ul>
            {isLoading ? <div>Carregando</div> : data.map(item => item.attributes.completed===false && <Task key={item.id} classes='taskContainer' id= {item.id} title={item.attributes.title} description={item.attributes.description} handleDelete={(e) => handleDeleteTask(e, item)} openModal={(e) => openModalUpdateTask(e)}  setChecked={(e) => handleSetCompleted(e)} /> )}
          </ul>
          <h2 className="tasksFinalizadas">Finalizadas</h2>
          <div className="finalizadas">
          <ul>
            {isLoading ? <div>Carregando</div> : data.map(item => item.attributes.completed===true && <Task key={item.id} classes='taskContainer completed' id= {item.id} title={item.attributes.title} description={item.attributes.description} handleDelete={() => deleteItem(item.id)} openModal={(e) => openModalUpdateTask(e)} checked={true} setChecked={(e) => handleSetCompleted(e)} />)}
          </ul>
          </div>
        </>
      );
  }