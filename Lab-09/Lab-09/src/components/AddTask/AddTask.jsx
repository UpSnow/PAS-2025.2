import { useState } from "react";
import { useTask } from "../../context/TaskContext";

const AddTask = ()=>{
    const [text, setText]= useState('')
    const {addTask}= useTask();


    function handleSubmit (e){
        e.preventDefault();
        if(!text) return

        setText("")
        addTask(text)

    }

    return(
        <form onSubmit={handleSubmit}>
            <input 
            type="text"
            placeholder="digite um texto"
            value={text}
            onChange={(e) => setText(e.target.value)} 
            />
            <button type="submit">Adicionar</button>

        </form>
    )



}
export default AddTask