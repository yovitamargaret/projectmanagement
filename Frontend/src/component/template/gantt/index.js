import { Chart } from "react-google-charts";
import axios from "axios"
import { useState, useEffect } from 'react';
import "./index.css";
import { useDispatch, useSelector } from "react-redux";

let GanttChart = (props)=>{
    const project = props.project;
    const [ data, setData] = useState([{}]);
    const [task_id,setTask_id] =useState(0);
    const {value}=useSelector(state=>state.statusLoad);
    const [status,setStatus] =useState(value);

    // const dispatch = useDispatch()
    useEffect(() =>{
      axios({
          method:"GET",
          url: "http://localhost:8088/api/task_detail"
      }).then((response) => {
          setData(response.data.data)
          setStatus(false)
          // dispatch(update({status}))
      }).catch((error) => {
       console.log(error)
      })  
      },[status])
      

    let diffDate=(start_date,due_date)=>{
      const start = new Date(start_date);
      let end = new Date(due_date)
      const oneDay = (1000*60*60*24);
      let result = Math.round((end - start) / oneDay)
      result =result+" day(s)" 
      return result
    }

      let customTooltips=(name, employee, start,end)=>{
        return(
          '<div>' +
          '<p> Task Name : '+name+'<br>'+
          'Assigned Employee : '+employee+'<br>'+
          'Start Date : '+start+'<br>'+
          'End Date : '+end+'<br>'+
          'Duration : '+diffDate(start,end)+'<br>'+
          '</p>'+
          '</div>'
        )
      }

      const dataTimeline=[[
        { type: "string", id: "Task Name" },
        { type: "string", id: "Assigned Employee" },
        // { type: "string", role: "tooltip" },
        {type: 'string', role: 'tooltip', 'p': {'html': true}},
        { type: "date", id: "Start" },
        { type: "date", id: "End" },
      ],...data.filter(x=>x.task?.task_approval_status === "Approved" && x.task?.project?.project_id===project).map(x=>
        [
          x.task.name.toString(),
          null,
          // x.employee.name.toString(),
          customTooltips(x.task.name.toString(),x.employee.name.toString(),new Date(x.task.start_date),new Date(x.task.due_date)),
          new Date(x.task.start_date),
          new Date(x.task.due_date),
        ])
      ]

     const dataGantt = [
      [
        { type: "string", label: "Task Detail Id" },
        { type: "string", label: "Task Name" },
        { type: "string", label: "Employee Name" },
        { type: "date", label: "Start Date" },
        { type: "date", label: "End Date" },
        { type: "number", label: "Duration" },
        { type: "number", label: "Task Id" },
        { type: "string", label: "Dependencies" },
        {type: 'string', role: 'tooltip', 'p': {'html': true}}
      ],...data.filter(x=>x.task?.task_approval_status === "Approved" && x.task?.project?.project_id===project).map(x=>

            [
              x.task_detail_id.toString(),
              x.task.name.toString(),
              x.employee.name.toString(),
              new Date(x.task.start_date),
              new Date(x.task.due_date),
              null,
              Math.floor(
                Math.max(
                  ((Math.min(new Date(), new Date(x.task.due_date)) - new Date(x.task.start_date)) /
                    (new Date(x.task.due_date) - new Date(x.task.start_date))) *
                    100,
                  0
                ) * 100
              ) / 100,
              null,
              customTooltips(x.task.name.toString(),x.employee.name.toString(),new Date(x.task.start_date),new Date(x.task.due_date))
            ])
        ]

  let rowHeight = (dataGantt.length) * 28;
  let chartHeight = 161;
  const options = {
    height: chartHeight,
    chartArea: {
      height: rowHeight,
    },
    gantt: {
      trackHeight: 30,
      percentEnabled: false,

    },
    tooltip: { isHtml: true }
  };
  const options2={
    allowHtml: true,
    height: chartHeight,
    chartArea: {
      height: rowHeight,
    },
    tooltip: { isHtml: true }
  }

  let Arrayproject=[]
  data.filter(x=>x.task?.project?.project_id===project).map(x=>{
    Arrayproject.push(
      x.task.project.name
    )
  })

  if (dataTimeline.length===1) {
    return(
      <div style={{height:161}}>
      <h3 className="title"> Create new Task to see chart</h3>
      </div>
    )
  } else {
    return(
      <>
        <Chart
        chartType="Timeline"
        width="100%"
        height="100%"
        data={dataTimeline}
        // data={dataa}
        options={options2}
        />  
        </>  
    )
  }
}

export default GanttChart;