import { createContext, useContext, useMemo, useState } from "react";


export const TaskContext = createContext();


export function TaskProvider({ children }) {
    const [ tasks, setTasks ] = useState([])
    const [filter,setFilter] = useState("all")

    function addTask(text) {
        const newTask = {
            id: Date.now(),
            text,
            completed: false
        }
        setTasks(prev => [...prev, newTask])
    }

    function removeTask(id){
        setTasks(prev => prev.filter(task => task.id !== id) )

    }


    function toggleTask(id) {
        setTasks(prev =>
            prev.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        )
    }

    function filteredTasks(){
        if(filter === "completed"){
            return tasks.filter(t => t.completed)
        }
        else if (filter === "pending"){
            return tasks.filter(t => !t.completed)
        }
        return tasks
        
    }

    const value = useMemo(() => ({ tasks, addTask, removeTask ,toggleTask, filter, setFilter, filteredTasks }), [tasks, filter])

    return(
        <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
    )
}

    export function useTask(){
        const context = useContext(TaskContext);
        if(!context){
            throw new Error('useTask deve ser usado dentro de TaskContext');
            
        }
        return context
    }