import { useTask } from "../../context/TaskContext";


const Filteres = () => {

    const {filter, setFilter} = useTask();

    return (

        <div>
            <button onClick={() => setFilter("all")} > Todas

            </button>

            <button onClick={() => setFilter("completed")} >
                Concluído
            </button>
            <button onClick={() => setFilter("pending")} >
                Pendentes
            </button>


            <p> Filtro atual: {filter} </p>
        </div>

    )

}


export default Filteres