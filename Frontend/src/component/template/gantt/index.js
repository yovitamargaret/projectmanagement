import { Chart } from "react-google-charts";
import axios from "axios"
import { useState, useEffect } from 'react';
import "./index.css";

let GanttChart = (props)=>{
    const project = props.project;
    const [ data, setData] = useState([{}]);
    const [task_id,setTask_id] =useState(0);
    const [status,setStatus] =useState(false);

    useEffect(() =>{
      axios({
          method:"GET",
          url: "http://localhost:8088/api/task_detail"
      }).then((response) => {
          setData(response.data.data)
          setStatus(false)
      }).catch((error) => {
       console.log(error)
      })  
      },[status])
      
     const dataGantt = [
      [
        { type: "string", label: "Task Detail Id" },
        { type: "string", label: "Task Name" },
        { type: "string", label: "Employee Name" },
        { type: "date", label: "Start Date" },
        { type: "date", label: "End Date" },
        { type: "number", label: "Duration" },
        { type: "number", label: "Percent Complete" },
        { type: "string", label: "Dependencies" }
      ],...data.filter(x=>x.task?.task_approval_status === "Approved" && x.task?.project?.project_id===project).map(x=>

            [
              x.task_detail_id.toString(),
              x.task.name.toString(),
              x.employee.name.toString(),
              new Date(x.task.start_date),
              new Date(x.task.due_date),
              null,
              null,
              null
            ])
        ]

  let paddingHeight = 75;
  let rowHeight = (dataGantt.length-1) * 35;
  let chartHeight = rowHeight + paddingHeight;
 const options = {
    height: chartHeight,
    chartArea: {
      height: rowHeight,
    },
    gantt: {
      trackHeight: 30,
    },
  };

  let Arrayproject=[]
  data.filter(x=>x.task?.project?.project_id===project).map(x=>{
    Arrayproject.push(
      x.task.project.name
    )
  })
    return(
      <>
      <h1 className="title">{Arrayproject[0]}</h1>
        <Chart
        chartType="Gantt"
        width="100%"
        height="100%"
        data={dataGantt}
        // data={dataa}
        options={options}
        />  
        </>  
    )
}

export default GanttChart;