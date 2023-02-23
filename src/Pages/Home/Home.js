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
      const modal = document.querySelector(".modalNovo")
      modal.classList.remove('active')
    }

    function postTask (item) {
      console.log(item)
      fetch(url, {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'bearer ' + token,
        },
        body: JSON.stringify({
          data: {
            title: item.attributes.title,
            description: item.attributes.description,
            completed: item.attributes.completed,
          } 
        })
      })
      .then(response => response.json())
      .then(setData([...data, item]))
      .catch(erro => console.log('Aconteceu um erro') + console.log(erro))
    }
    // POST dados fim
  
  
    //UPDATE dados
    function openModalUpdateTask(e) {
      const modal = document.querySelector(".modalUpdate")
      modal.classList.add('active')
      const id = e.target.parentNode.parentNode.id
      const taskTitleSelect = document.querySelector(`.taskTitle-${id}`)
      const taskTitle = taskTitleSelect.textContent
      const taskDescriptionSelect = document.querySelector(`.taskDescription-${id}`)
      const taskDescription = taskDescriptionSelect.textContent
      setId(Number(id))
      setTitle(taskTitle)
      setDescription(taskDescription)
    }

    function handleUpdateTask(e) {
      e.preventDefault()
      updateTask(newTask)
      const modal = document.querySelector(".modalUpdate")
      modal.classList.remove('active')
      document.getElementById("taskForm").reset();
    }

    function updateTask(item) {
      const updatedIndex = data.findIndex(arr => arr.id === item.id)
      data[updatedIndex] = item
      const newArray = [...data]  
      fetch(`${url}/${item.id}`, {
        method:'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'bearer ' + token,
        },
        body: JSON.stringify({
          data: {
            title: item.attributes.title,
            description: item.attributes.description,
            completed: item.attributes.completed,
          } 
        })
      })
      .then(response => response.json())
      .then(setData(newArray))
      .then(setCompleted(false))
      .catch(erro => console.log('Aconteceu um erro') + console.log(erro))
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
      .then(setData((arr) => arr.filter((item) => item.id !== id)))
      .catch(erro => console.log('Aconteceu um erro -') + console.log(erro))
    }
    // DELETE task fim
  

    //CHECKBOX
    function handleSetCompleted(e) {
      const id = Number(e.target.id)
      const taskTitleSelect = document.querySelector(`.taskTitle-${id}`)
      const taskTitle = taskTitleSelect.textContent
      const taskDescriptionSelect = document.querySelector(`.taskDescription-${id}`)
      const taskDescription = taskDescriptionSelect.textContent
      setId(Number(id))
      setDescription(taskDescription)
      const task = {
        id:id,
        attributes: {
          title: taskTitle,
          description: description,
          completed: e.target.checked ? true : false,
        }
      }
      updateTask(task)
    }
    //CHECKBOX fim
  
    
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [id, setId] = useState('')
    const [completed, setCompleted] = useState(false)
  
    const newTask = {
      id:id,
      attributes: {
        title: title,
        description: description,
        completed: completed,
      }
    }

      return ( 
        <>
        <Modal title={(a) => setTitle(a.target.value)} description={(a) => setDescription(a.target.value)} submit={(e) => handlePostTask(e)} />
        <ModalUpdate title={(a) => setTitle(a.target.value)} description={(a) => setDescription(a.target.value)} valueTitle={title} valueDescription={description} submit={(e) => handleUpdateTask(e)}/>
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