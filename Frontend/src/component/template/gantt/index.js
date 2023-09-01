import { Chart } from "react-google-charts";
import axios from "axios"
import { useState, useEffect } from 'react';

let GanttChart = ()=>{
    const [ data, setData] = useState([{}]);
    const [task_id,setTask_id] =useState(0);
    const [status,setStatus] =useState(false);

    useEffect(() =>{
      axios({
          method:"GET",
          url: "http://localhost:8088/api/task_detail"
      }).then((response) => {
          setData(response.data.data)
          setStatus(true)
      }).catch((error) => {
       console.log(error)
      })  
      },[status])
      
     const dataGantt = [
      [
        { type: "string", label: "Task Detail Id" },
        { type: "string", label: "Task Name" },
        { type: "string", label: "Task Id" },
        { type: "date", label: "Start Date" },
        { type: "date", label: "End Date" },
        { type: "number", label: "Duration" },
        { type: "number", label: "Percent Complete" },
        { type: "string", label: "Dependencies" }
      ],...data.filter(x=>x.task?.task_approval_status === "Approved" && x.task?.project?.project_id===2).map(x=>
          // dataGantt.push(
            [
              x.task_detail_id.toString(),
              x.task.name.toString(),
              x.task.task_id.toString(),
              new Date(x.task.start_date),
              new Date(x.task.due_date),
              null,
              null,
              null
              // x.employee.name.toString()
            ])
        ]

    console.log(dataGantt)

 const options = {
  height: 200,
  gantt: {
    trackHeight: 30,
  },
};
    // let data={
        
    // }
    return(
        <Chart
        chartType="Gantt"
        width="100%"
        height="50%"
        data={dataGantt}
        // data={dataa}
        options={options}
        />    
    )
}

export default GanttChart;