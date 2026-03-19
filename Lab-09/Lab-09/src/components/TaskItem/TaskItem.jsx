import { useTask } from "../../context/TaskContext";

const TaskItem = ({task})=>{
    const {toggleTask, removeTask} = useTask();

    return(
        <div>
      <span
        onClick={() => toggleTask(task.id)}
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          cursor: "pointer"
        }}
      >
        {task.text}
      </span>


      <button type='button' onClick={() => removeTask(task.id)}>Remover Task</button>
    </div>
    )

}

export default TaskItem