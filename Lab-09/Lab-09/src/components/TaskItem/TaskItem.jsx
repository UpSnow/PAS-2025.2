import { useTask } from "../../context/TaskContext";

const TaskItem = (task)=>{
    const {toggleTask} = useTask();

    return(
        <div>
            <span onClick={()=> toggleTask(task.id)}
            style={{textDecoration: task.completed ? "line-through": "none", cursor: "pointer"}}>
                {task.text}

            </span>
        </div>
    )

}

export default TaskItem