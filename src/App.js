import React from 'react'
import { Home } from './Pages/Home/Home'
import { Task } from './Pages/Task/Task'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task" element={<Task />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App