import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import Header from './components/Header/Header'
import AddTask from './components/AddTask/AddTask'
import TaskList from './components/TaskList/TaskList'

function App() {

  return (
   <div>
    <Header/>
    <AddTask/>
    <TaskList/>
   </div>
  )
}

export default App
