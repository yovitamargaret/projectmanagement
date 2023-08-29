import axios from "axios"
import { useState, useEffect } from 'react';
import 'sweetalert2/dist/sweetalert2.min.css';
import Board from 'react-trello'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

let Task = () =>{
    const [ data, setData] = useState([{}]);
    const [ employeeData, setEmployeeData] = useState([{}]);
    const [task_id,setTask_id] =useState(0);
    const [employee_id,setEmployee_id] =useState(0);
    const [status,setStatus] =useState(false);
    const [show, setShow] = useState(false);

    const [task_title,setTask_title] =useState("");
    const [desc,setDesc] =useState("");
    const [start_date,setStart_date] =useState("");
    const [due_date,setDue_date] =useState("");
    
    const handleClose = () =>{
      setShow(false);
      setTask_title("");
      setDesc("");
      setStart_date("");
      setDue_date("");
      setEmployee_id(0);
  } 
  const handleShow = () => setShow(true);

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

  let onCardClick=(cardId)=>{
    axios({
      method: 'Get',
      headers: {
        'Content-Type': 'application/json',
      },
      url: `http://localhost:8088/api/task_detail/${cardId}`,
    })
      .then((response) => {
        if (response.data.status === 200) {
          // setStatus(true);
          console.log(response)
          setTask_id(response.data.data.task.task_id)
          setTask_title(response.data.data.task.name)
          setDesc(response.data.data.task.description)
          setStart_date(response.data.data.task.start_date)
          setDue_date(response.data.data.task.due_date)
          setEmployee_id(response.data.data.employee.employee_id)
          setShow(true)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const onSubmit = () => {
    handleClose();

    let data_task = {
        // "task_id": id,
        
        // "employee": {"employee_id":employee_id},
        // "task": {
          "name": task_title,
          "description": desc,
          "start_date": start_date,
          "due_date": due_date,
          "task_approval_status":"Pending",
          "project": {"project_id":2},
        // },
        // "task_status": "Not Started"
    }

    axios({
        method :"POST",
        headers: {
            'Content-Type' : 'application/json',
        },
        url: "http://localhost:8088/api/task",
        data:JSON.stringify(data_task)
      }).then((response)=>{
        if(response.data.status === 200){
          // console.log(response)
          axios({
            method:"GET",
            url: "http://localhost:8088/api/task/last"
        }).then((response) => {
          // setStatus(false)
            if (response.data.status === 200) {
                // setLastTask_id(response.data.data)
                // setStatus(true);

                let data_taskdetail = {
                  // "task_id": id,
                  "employee": {"employee_id":employee_id},
                  "task": {"task_id":response.data.data},
                  "task_status": "Not Started"
                }
                axios({
                  method :"POST",
                  headers: {
                      'Content-Type' : 'application/json',
                  },
                  url: "http://localhost:8088/api/task_detail",
                  data:JSON.stringify(data_taskdetail)
                }).then((response)=>{
                  if(response.data.status === 200){
                    console.log(response)
                    setStatus(true)
                  }
                }).catch((error)=> {
                  console.log(error)
                })


                console.log(response.data.data)
            }
        }).catch((error) => {
         console.log(error)
          })
   }
    }).catch((error)=> {
        console.log(error)
    })
}

  let diffDate=(due_date)=>{
    const now = new Date();
    let end_date = new Date(due_date)
    const oneDay = (1000*60*60*24);
    let result = Math.round(Math.abs((end_date - now) / oneDay))+" day(s) remaining"
    return result
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
    
    axios({
          method:"GET",
          url: "http://localhost:8088/api/employee"
      }).then((response) => {
          setEmployeeData(response.data.data)
      }).catch((error) => {
       console.log(error)
      })

    },[status])
    
    const { lanes } = data_board;
    data.filter(x=>x.task_status==="Not Started").map((x,index)=>{
        lanes[0].cards.push({
          id: x.task_detail_id.toString(),
          title: x.task.name,
          description: x.task.description,
          tags:[
            {
              bgcolor: '#0079BF',
              color: 'white',
              title: x.employee.name
            }
          ],
          label: diffDate(x.task.due_date)
      });
    })
    data.filter(x=>x.task_status==="Ongoing").map(x=>{
      lanes[1].cards.push({
          id: x.task_detail_id.toString(),
          title: x.task.name,
          description: x.task.description,
          tags:[
            {
              bgcolor: '#0079BF',
              color: 'white',
              title: x.employee.name
            }
          ],
          label: diffDate(x.task.due_date)
      });
    })
    data.filter(x=>x.task_status==="Done").map(x=>{
      lanes[2].cards.push({
        id: x.task_detail_id.toString(),
        title: x.task.name,
        description: x.task.description,
        tags:[
          {
            bgcolor: '#0079BF',
            color: 'white',
            title: x.employee.name
          }
        ],
        // label: new Date(x.task.due_date)-new Date()
        label: diffDate(x.task.due_date)
        // label: x.task.due_date
      });
    })
    data.filter(x=>x.task_status==="Bug").map(x=>{
      lanes[3].cards.push({
        id: x.task_detail_id.toString(),
        title: x.task.name,
        description: x.task.description,
        tags:[
          {
            bgcolor: '#0079BF',
            color: 'white',
            title: x.employee.name
          }
        ],
        label: diffDate(x.task.due_date)
      });
    })

    lanes[0].label=data.filter(x=>x.task_status==="Not Started").length.toString();
    lanes[1].label=data.filter(x=>x.task_status==="Ongoing").length.toString();
    lanes[2].label=data.filter(x=>x.task_status==="Done").length.toString();
    lanes[3].label=data.filter(x=>x.task_status==="Bug").length.toString();

    return(
      <div>
        <button onClick={handleShow}>CREATE</button>

        <Board editable data={data_board} onCardDelete={onCardDelete} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} onCardClick={onCardClick}/>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>{'Create/Request Task'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group className="mb-3" controlId="task_id">
          {/* <Form.Label>Task Id</Form.Label> */}
          <Form.Control name="task_detail_id" placeholder="Task Id" type="hidden" value={task_id} onChange={e=> setTask_id(e.targer.value)}  />
        </Form.Group>
        <Form.Group className="mb-3" controlId="task_title">
          <Form.Label>Task Title</Form.Label>
          <Form.Control name="task_title" placeholder="Task Title" type="text" value={task_title} onChange={e=> setTask_title(e.target.value)}  />
        </Form.Group>
        <Form.Group className="mb-3" controlId="desc">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} onChange={e=> setDesc(e.target.value)} value={desc} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="start_date">
          <Form.Label>Start Date</Form.Label>
          <Form.Control name="start_date"  type="date" value={start_date} onChange={e=> setStart_date(e.target.value)}  />
        </Form.Group>
        <Form.Group className="mb-3" controlId="due_date">
          <Form.Label>Due Date</Form.Label>
          <Form.Control name="due_date" type="date" value={due_date} onChange={e=> setDue_date(e.target.value)}  />
        </Form.Group>
        <Form.Group className="mb-3" controlId="employee">
          <Form.Label>Assign Employee</Form.Label>
          <Form.Select aria-label="Select Employee" value={employee_id} onChange={e=> setEmployee_id(parseInt(e.target.value))}>
            <option value="">Select Assign Employee</option>
            {employeeData.map(d=>{
              return(
                <option key={d.employee_id} value={d.employee_id} > {d.name} </option>
              )
            })}
          </Form.Select>
        </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={onSubmit}>
          {'Create'}
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    )
}

export default Task;