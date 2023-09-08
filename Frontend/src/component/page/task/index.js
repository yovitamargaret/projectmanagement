import TaskTemplate from "../../template/task"
import GanttChart from "../../template/gantt";
import "./index.css"
import axios from 'axios';
import { useState, useEffect } from 'react';
// import { getPost, getPosts } from "./api";
import {useParams} from "react-router-dom";
function Task(){
    const { project_id } = useParams();
    const [data, setData] = useState([{}]);
    const [status,setStatus] = useState(false);

    useEffect(() => {
        axios({
            method: "GET",
            url: `http://localhost:8088/api/project/${project_id}`
        }).then((response) => {
            setData(response.data.data);
        }).catch((error) => {
            console.log(error);
        });
    }, [status]);


    return(
        <>
        <div className="task">
            <h1>{data.name}</h1>
            <div clssName="gantt">
                <GanttChart  project={parseInt(project_id)}></GanttChart>
            </div>
            <div className="board">
                <TaskTemplate project={parseInt(project_id)}></TaskTemplate>
            </div>
        </div>
        </>
    )
}

export default Task;