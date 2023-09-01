import TaskTemplate from "../../template/task"
import GanttChart from "../../template/gantt";
import "./index.css"

function Task(){
    return(
        <>
        <div>
        <GanttChart className="gantt"></GanttChart>
        <div className="board">
        <TaskTemplate></TaskTemplate>
        </div>
        </div>
        </>
    )
}

export default Task;