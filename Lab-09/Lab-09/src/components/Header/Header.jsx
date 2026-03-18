import { useTask } from "../../context/TaskContext";


const Header= ()=>{
    const {tasks} = useTask()
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length

return(
    <header>
        <h1>📋To-do App</h1>
        <p>Total: {total}</p>
        <p>Completadas: {completed}</p>
    </header>
)
}



export default Header