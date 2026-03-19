import { useTask } from "../../context/TaskContext";
import TaskItem from "../TaskItem/TaskItem";

const TaskList = ()=>{
    const {filteredTasks} = useTask();

    const tasks = filteredTasks();


    return(
        <div>
            {tasks.map(task =>(
                <TaskItem key={task.id} task={task}/>
            ))}
        </div>
    )
}

export default TaskList