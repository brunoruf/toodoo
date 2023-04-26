import { Task } from "../../Components/Task/Task";
import './Home.css'
import { useEffect, useState } from "react";
import { Modal} from "../../Components/Modal/Modal";
import { ModalUpdate} from "../../Components/Modal/ModalUpdate";
import { ButtonPrimary } from "../../Components/Button/ButtonPrimary";
import { IData } from "../../shared/interfaces/IData";


const url = process.env.REACT_APP_BASE_URL || '';
const token = process.env.REACT_APP_API_TOKEN

export const Home = () => {
    
    const [data, setData] = useState<IData[]>([]);
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
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
    }, [])
    // GET Fim
    
    // POST dados
    function openModalNewTask() {
      if (data.length === 0) {
        setId(1)
      } else {
        const getDataLength= data.length - 1
        const newId = data[getDataLength].id
        setId(newId + 1)
      }

      const modal = document.querySelector(".modalNovo")!
      modal.classList.add('active')
    }

    function handlePostTask(e: React.FormEvent<HTMLButtonElement>) {
      e.preventDefault()
      postTask(newTask)
      const modal = document.querySelector(".modalNovo")!
      modal.classList.remove('active')
    }

    function postTask (item:IData) {
      fetch(url, {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'bearer ' + token,
        },
        body: JSON.stringify({
          data: {
            id: item.id,

              title: item.attributes.title,
              description: item.attributes.description,
              completed: item.attributes.completed,
            
          } 
        })
      })
      .then(response => response.json())
      .then(() => setData([...data, item]))
      .catch(error => console.log('Aconteceu um erro' + error))
      setTitle('')
      setDescription('')
      const formId = 'addTask'
      const selectForm = document.getElementById(formId) as HTMLFormElement
      selectForm.reset()
    }
    // POST dados fim
    
  
    //UPDATE dados
    function openModalUpdateTask(e:React.ChangeEvent<any>) {
      const modal = document.querySelector(".modalUpdate")!
      modal.classList.add('active')
      const id = Number(e.target.parentNode.parentNode.id)
      const taskTitleSelect = document.querySelector(`.taskTitle-${id}`)!
      const taskTitle = String(taskTitleSelect.textContent)
      const taskDescriptionSelect = document.querySelector(`.taskDescription-${id}`)!
      const taskDescription = String(taskDescriptionSelect.textContent)
      setId(id)
      setTitle(taskTitle)
      setDescription(taskDescription)
    }

    function handleUpdateTask(event: React.FormEvent<HTMLButtonElement>) {
      event.preventDefault()
      updateTask(newTask)
      const modal = document.querySelector(".modalUpdate")!
      modal.classList.remove('active')
      const taskSelect = document.getElementById("taskForm") as HTMLFormElement | null;
      if (taskSelect != null) {
        taskSelect.reset()
      }
    }

    function updateTask(item:IData) {
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
      .then(() => setData(newArray))
      .then(() => setCompleted(false))
      .catch(error => console.log('Aconteceu um erro') + error)
    }
    // UPDATE dados fim
  

    // DELETE task
    function handleDeleteTask(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: IData) {
      e.preventDefault()
      deleteItem(item.id)
    }
  
    function deleteItem(id:Number) {
      fetch(`${url}/${id}`, {
        method:'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'bearer ' + token,
        },
      })
      .then(() => setData((arr) => arr.filter(item => item.id !== id)))
      .catch(error => console.log('Aconteceu um erro -' + error))
    }
    // DELETE task fim
  

    //CHECKBOX
    function handleSetCompleted(e:any) {
      const id = Number(e.target.id)
      const taskTitleSelect = document.querySelector(`.taskTitle-${id}`)!
      const taskTitle = String(taskTitleSelect.textContent)
      const taskDescriptionSelect = document.querySelector(`.taskDescription-${id}`)!
      const taskDescription = String(taskDescriptionSelect.textContent)
      const task:IData = {
        id:id,
        attributes: {
          title: taskTitle,
          description: taskDescription,
          completed: e.target.checked ? true : false,
        }
      }
      updateTask(task)
    }
    //CHECKBOX fim
    
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState('')
    const [id, setId] = useState<number>(0)
    const [completed, setCompleted] = useState(false)
  
    const newTask:IData = {
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
            {isLoading ? <div>Carregando</div> : data.length === 0 ? <div className="taskDescription">Comece cadastrando uma tarefa no botão "NOVA TASK"</div> : data.map(item => item.attributes.completed===false && 
              <Task 
                key={item.id} 
                classes='taskContainer' 
                id= {String(item.id)} 
                title={item.attributes.title} 
                description={item.attributes.description} 
                handleDelete={(e) => handleDeleteTask(e, item)} 
                openModal={(e) => openModalUpdateTask(e)}  
                setChecked={(e) => handleSetCompleted(e)} 
              /> )}
          </ul>
          <h2 className="tasksFinalizadas">Finalizadas</h2>
          <div className="finalizadas">
          <ul>
            {isLoading ? <div>Carregando</div> : data.map(item => item.attributes.completed===true && 
              <Task 
                key={item.id} 
                classes='taskContainer completed' 
                id= {String(item.id)} 
                title={item.attributes.title} 
                description={item.attributes.description} 
                handleDelete={() => deleteItem(item.id)} 
                openModal={(e) => openModalUpdateTask(e)} 
                checked={true} 
                setChecked={(e) => handleSetCompleted(e)} 
              />)}
          </ul>
          </div>
        </>
      );
  }