import axios from "axios"
import { useState, useEffect } from 'react';
import 'sweetalert2/dist/sweetalert2.min.css';
import Board from 'react-trello'

let Task = () =>{
    const [ data, setData] = useState([{}]);
    const [task_id,setTask_id] =useState(0);
    const [employee_id,setEmployee_id] =useState(0);
    const [status,setStatus] =useState(false);
    const data_board = {
        lanes: [
        {
            id: 'Not Started',
            title: 'Not Started',
            cards: []
                },
        {
            id: 'Ongoing',
            title: 'Ongoing',
            cards: []
        },
        {
            id: 'Done',
            title: 'Done',
            cards: []
        },
        {
            id: 'Bug',
            title: 'Bugs',
            cards: []
        }
        ]
    }

    let handleDragStart=(cardId, laneId)=>{
      axios({
        method: 'Get',
        headers: {
          'Content-Type': 'application/json',
        },
        url: `http://localhost:8088/api/task_detail/${cardId}`,
      })
        .then((response) => {
            setTask_id(response.data.data.task.task_id)
            setEmployee_id(response.data.data.employee.employee_id)
        })
        .catch((error) => {
          console.log(error);
        });
    }

    let handleDragEnd=(cardId,sourceLaneId,targetLaneId,position,cardDetails)=>{

      let data_update = {
          "task_detail_id": cardId,
          "task":{"task_id":task_id},
          "employee":{"employee_id":employee_id},
          "task_status": targetLaneId,
      }
      axios({
          method: 'Post',
          headers: {
            'Content-Type': 'application/json',
          },
          url: `http://localhost:8088/api/task_detail`,
          data:JSON.stringify(data_update)
        })
          .then((response) => {
            if (response.data.status === 200) {
              setStatus(true);
              // window.location.href="/task";
            }
          })
          .catch((error) => {
            console.log(error);
          });
  }
  
  let onCardDelete=(cardId)=>{
      axios({
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          url: `http://localhost:8088/api/task_detail/${cardId}`,
        })
          .then((response) => {
            if (response.data.status === 200) {
              setStatus(true);
            }
          })
          .catch((error) => {
            console.log(error);
          });
  }

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
    
    const { lanes } = data_board;
    data.filter(x=>x.task_status==="Not Started").map(x=>{
        lanes[0].cards.push({
        id: x.task_detail_id.toString(),
        title: x.task.name,
        description: x.task.description,
        label: x.employee.name
        });
    })
    data.filter(x=>x.task_status==="Ongoing").map(x=>{
        lanes[1].cards.push({
        id: x.task_detail_id.toString(),
        title: x.task.name,
        description: x.task.description,
        label: x.employee.name
        });
    })
    data.filter(x=>x.task_status==="Done").map(x=>{
        lanes[2].cards.push({
        id: x.task_detail_id.toString(),
        title: x.task.name,
        description: x.task.description,
        label: x.employee.name
        });
    })
    data.filter(x=>x.task_status==="Bug").map(x=>{
        lanes[3].cards.push({
        id: x.task_detail_id.toString(),
        title: x.task.name,
        description: x.task.description,
        label: x.employee.name
        });
    })

    lanes[0].label=data.filter(x=>x.task_status==="Not Started").length.toString();
    lanes[1].label=data.filter(x=>x.task_status==="Ongoing").length.toString();
    lanes[2].label=data.filter(x=>x.task_status==="Done").length.toString();
    lanes[3].label=data.filter(x=>x.task_status==="Bug").length.toString();

    return(
        <Board data={data_board} onCardDelete={onCardDelete} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd}/>
    )
}
export default Task;



