import { createContext, useContext, useMemo, useState } from "react";


export const TaskContext = createContext();


export function TaskProvider({ children }) {
    const [ tasks, setTasks ] = useState([])

    function addTask(text) {
        const newTask = {
            id: Date.now(),
            text,
            completed: false
        }
        setTasks(pre => [...pre, newTask])
    }


    function toggleTask(id) {
        setTasks(pre =>
            pre.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        )
    }

    const value = useMemo(() => ({ tasks, addTask, toggleTask }), [tasks])

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