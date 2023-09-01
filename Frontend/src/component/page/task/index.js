import TaskTemplate from "../../template/task"
import GanttChart from "../../template/gantt";
import "./index.css"
// import { getPost, getPosts } from "./api";
import {useParams} from "react-router-dom";
function Task(){
    const { project_id } = useParams();
    return(
        <>
        <div className="task">
        <div className="gantt">
         <GanttChart project={parseInt(project_id)}></GanttChart>
        </div>
        <div className="board">
        <TaskTemplate project={parseInt(project_id)}></TaskTemplate>
        </div>
        </div>
        </>
    )
}

export default Task;