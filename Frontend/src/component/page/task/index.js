import TaskTemplate from "../../template/task"
import GanttChart from "../../template/gantt";
import "./index.css"

function Task(){

    return(
        <>
        <div>
        <div className="gantt">
         <GanttChart project={2}></GanttChart>
        </div>
        <div className="board">
        <TaskTemplate project={2}></TaskTemplate>
        </div>
        </div>
        </>
    )
}

export default Task;