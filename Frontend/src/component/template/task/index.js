import axios from "axios"
import { useState, useEffect } from 'react';
import 'sweetalert2/dist/sweetalert2.min.css';
import Board from 'react-trello';
import BoardWrapper from 'react-trello';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

let Task = (props) =>{
   const project=props.project;
    const [ data, setData] = useState([{}]);
    const [ dataRequestTask, setDataRequestTask] = useState([{}]);
    const [ employeeData, setEmployeeData] = useState([{}]);
    const [task_id,setTask_id] =useState(0);
    const [task_detail_id,setTaskDetail_id] =useState(0);
    const [project_id,setProject_id] =useState(0);
    const [employee_id,setEmployee_id] =useState(0);
    const [status,setStatus] =useState(false);
    const [show, setShow] = useState(false);
    const [showRequestedTask, setShowRequestedTask] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const [task_title,setTask_title] =useState("");
    const [desc,setDesc] =useState("");
    const [start_date,setStart_date] =useState("");
    const [due_date,setDue_date] =useState("");
    const [task_approval_status,setTaskApprovalStatus] =useState("");
    const [task_status,setTaskStatus] =useState("");

    const handleClose = () =>{
      setShow(false);
      setSelectedTask(null);
      // setShowEdit(false);
      setTask_title("");
      setTaskDetail_id(0);
      setTask_id(0);
      setProject_id(0);
      setDesc("");
      setStart_date("");
      setDue_date("");
      setEmployee_id(0);
  } 
  const handleShow = () => {
    setShow(true)
  };
  const requestTaskHandleClose = () =>{
      setShowRequestedTask(false);
  } 
  const requestTaskHandleShow = () => {
      setShowRequestedTask(true)
  };

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
          method: 'Get',
          headers: {
            'Content-Type': 'application/json',
          },
          url: `http://localhost:8088/api/task_detail/${cardId}`,
        })
          .then((response) => {
            if (response.data.status === 200) {
              // setTask_id(response.data.data.task.task_id)
              // console.log(response)
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
                    // setTask_id(response.data.data.task.task_id)
                  }
                })
                .catch((error) => {
                  console.log(error);
                });

              axios({
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
                url: `http://localhost:8088/api/task/${response.data.data.task.task_id}`,
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
          })
          .catch((error) => {
            console.log(error);
          });

      // axios({
      //     method: 'DELETE',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     url: `http://localhost:8088/api/task_detail/${cardId}`,
      //   })
      //     .then((response) => {
      //       if (response.data.status === 200) {
      //         setStatus(true);
      //         // setTask_id(response.data.data.task.task_id)
      //       }
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });

      // axios({
      //     method: 'DELETE',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     url: `http://localhost:8088/api/task/${task_id}`,
      //   })
      //     .then((response) => {
      //       if (response.data.status === 200) {
      //         setStatus(true);
      //       }
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });
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
          // console.log(response)
          setSelectedTask(response.data.data)
          setTask_id(response.data.data.task.task_id)
          setTaskDetail_id(response.data.data.task_detail_id)
          setTask_title(response.data.data.task.name)
          setDesc(response.data.data.task.description)
          setEmployee_id(response.data.data.employee.employee_id)
          setProject_id(response.data.data.task.project.project_id)
          setTaskApprovalStatus(response.data.data.task.task_approval_status)
          setTaskStatus(response.data.data.task_status)
          const selectedStartDate = new Date(response.data.data.task.start_date);
          const formattedStartDate = `${selectedStartDate.getFullYear()}-${(selectedStartDate.getMonth() + 1)
                .toString()
                .padStart(2, '0')}-${selectedStartDate.getDate().toString().padStart(2, '0')}`;
          setStart_date(formattedStartDate)
          const selectedDueDate = new Date(response.data.data.task.due_date);
          const formattedDueDate = `${selectedDueDate.getFullYear()}-${(selectedDueDate.getMonth() + 1)
                .toString()
                .padStart(2, '0')}-${selectedDueDate.getDate().toString().padStart(2, '0')}`;
          setDue_date(formattedDueDate)
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
        "task_id": task_id,
        
        // "employee": {"employee_id":employee_id},
        // "task": {
          "name": task_title,
          "description": desc,
          "start_date": start_date,
          "due_date": due_date,
          "task_approval_status":"Pending",
          "project": {"project_id":project},
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
                  "task_detail_id": task_detail_id,
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
                    // console.log(response)
                    setStatus(true)
                  }
                }).catch((error)=> {
                  console.log(error)
                })


                // console.log(response.data.data)
            }
        }).catch((error) => {
         console.log(error)
          })
   }
    }).catch((error)=> {
        console.log(error)
    })
}

const onSubmitEdit = () => {
  handleClose();

  let data_task = {
      "task_id": task_id,
      
      // "employee": {"employee_id":employee_id},
      // "task": {
        "name": task_title,
        "description": desc,
        "start_date": start_date,
        "due_date": due_date,
        "task_approval_status":task_approval_status,
        "project": {"project_id":project_id},
      // },
      // "task_status": "Not Started"
  }

  axios({
      method :"POST",
      headers: {
          'Content-Type' : 'application/json',
        },
      data:JSON.stringify(data_task),
      url: "http://localhost:8088/api/task",
    }).then((response)=>{
      if(response.data.status === 200){
        // console.log(response)
        let data_taskdetail = {
          "task_detail_id": task_detail_id,
          "employee": {"employee_id":employee_id},
          "task": {"task_id":task_id},
          "task_status": task_status
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
            // console.log(response)
            setStatus(true)
          }
        }).catch((error)=> {
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
    let result = Math.round((end_date - now) / oneDay)
    if (result<0){
      result =Math.abs(result)+" day(s) overdue" 
    }else if(result===0){
      result ="Deadline Today"
    }else{
      result =result+" day(s) remaining" 
    }
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
    data.filter(x=>x.task_status==="Not Started"&& x.task.task_approval_status ==="Approved"&& x.task.project.project_id ===project).map((x,index)=>{
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
    data.filter(x=>x.task_status==="Ongoing"&& x.task.task_approval_status ==="Approved"&& x.task.project.project_id ===project).map(x=>{
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
    data.filter(x=>x.task_status==="Done"&& x.task.task_approval_status ==="Approved"&& x.task.project.project_id ===project).map(x=>{
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
    data.filter(x=>x.task_status==="Bug"&& x.task.task_approval_status ==="Approved"&& x.task.project.project_id ===project).map(x=>{
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

    lanes[0].label=data.filter(x=>x.task_status==="Not Started" && x.task.task_approval_status ==="Approved" && x.task.project.project_id ===project).length.toString();
    lanes[1].label=data.filter(x=>x.task_status==="Ongoing"&& x.task.task_approval_status ==="Approved"&& x.task.project.project_id ===project).length.toString();
    lanes[project].label=data.filter(x=>x.task_status==="Done"&& x.task.task_approval_status ==="Approved" && x.task.project.project_id ===project).length.toString();
    lanes[3].label=data.filter(x=>x.task_status==="Bug"&& x.task.task_approval_status ==="Approved"&& x.task.project.project_id ===project).length.toString();


    let approveTask=(task_id)=>{
      axios({
          method:"GET",
          url: `http://localhost:8088/api/task/${task_id}`,
      }).then((response) => {
          let dataApprove={
            "task_id":response.data.data.task_id,
            "name":response.data.data.name,
            "description":response.data.data.description,
            "start_date":response.data.data.start_date,
            "due_date":response.data.data.due_date,
            "task_approval_status":"Approved",
            "project":{"project_id":response.data.data.project.project_id},
          }
          axios({
              method:"POST",
              url: `http://localhost:8088/api/task`,
              headers: {
                'Content-Type' : 'application/json',
              },
              data:JSON.stringify(dataApprove),
          }).then((response) => {
              setShowRequestedTask(false)
              setStatus(true)
              // console.log(response)
          }).catch((error) => {
          console.log(error)
          })
      }).catch((error) => {
      console.log(error)
      })
    }

    let rejectTask=(task_id)=>{
      axios({
        method:"GET",
        url: `http://localhost:8088/api/task/${task_id}`,
    }).then((response) => {
        let dataReject={
          "task_id":response.data.data.task_id,
          "name":response.data.data.name,
          "description":response.data.data.description,
          "start_date":response.data.data.start_date,
          "due_date":response.data.data.due_date,
          "task_approval_status":"Rejected",
          "project":{"project_id":response.data.data.project.project_id},
        }
        axios({
            method:"POST",
            url: `http://localhost:8088/api/task`,
            headers: {
              'Content-Type' : 'application/json',
            },
            data:JSON.stringify(dataReject),
        }).then((response) => {
            setShowRequestedTask(false)
            setStatus(true)
            // console.log(response)
        }).catch((error) => {
        console.log(error)
        })
    }).catch((error) => {
    console.log(error)
    })
    }

    return(
      <div>
        <Button variant="primary" onClick={handleShow}>Create Task</Button>
        <Button variant="primary" onClick={requestTaskHandleShow}>Requested Task</Button>

        <Board 
        style={{height:315}} 
        data={data_board} 
        onCardDelete={onCardDelete} 
        handleDragStart={handleDragStart} 
        handleDragEnd={handleDragEnd} 
        onCardClick={onCardClick}
        laneStyle={{
          maxHeight:270
        }}
        />

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>{selectedTask ? 'Edit Task' : 'Create/Request Task'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group className="mb-3" controlId="task_id">
          {/* <Form.Label>Task Id</Form.Label> */}
          <Form.Control name="task_id" placeholder="Task Id" type="hidden" value={task_id} onChange={e=> setTask_id(e.target.value)}  />
        </Form.Group>
        <Form.Group className="mb-3" controlId="task_detail_id">
          {/* <Form.Label>Task Id</Form.Label> */}
          <Form.Control name="task_detail_id" placeholder="Task Detail Id" type="hidden" value={task_detail_id} onChange={e=> setTaskDetail_id(e.target.value)}  />
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
          <Form.Control name="start_date"  type="date" value={start_date} onChange={e=>{
            const selectedStartDate = new Date(e.target.value);
            const formattedStartDate = `${selectedStartDate.getFullYear()}-${(selectedStartDate.getMonth() + 1)
                .toString()
                .padStart(2, '0')}-${selectedStartDate.getDate().toString().padStart(2, '0')}`;
            setStart_date(formattedStartDate);
          }}  />
        </Form.Group>
        <Form.Group className="mb-3" controlId="due_date">
          <Form.Label>Due Date</Form.Label>
          <Form.Control name="due_date" type="date" value={due_date} onChange={e=> {
            const selectedDate = new Date(e.target.value);
            const formattedDate = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1)
                .toString()
                .padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`;
            setDue_date(formattedDate);
            }}  />
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
          <Button variant="success" onClick={selectedTask ? onSubmitEdit :onSubmit}>
          {selectedTask ? 'Save Changes' : 'Create'}
          </Button>
        </Modal.Footer>
      </Modal>
          

      <Modal show={showRequestedTask} onHide={requestTaskHandleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Requested Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {data.filter(x=> x.task?.task_approval_status ==="Pending" && x.task?.project?.project_id ===project).map(x=>{
            return(
                <Card key={x.task?.task_detail_id}>
                <Card.Body>
                  <Card.Title>{x.task?.name}</Card.Title>
                    <br/>
                  <Card.Text>
                    {x.task?.description}
                    <br/>
                    Start Date : {x.task?.start_date}
                    <br/>
                    Due Date : {x.task?.due_date}
                    <br/>
                    Assigned Employee : {x.employee?.name}
                  </Card.Text>
                    <Button variant="danger" onClick={()=>rejectTask(x.task?.task_id)}>Reject</Button>
                    <Button variant="primary" onClick={()=>approveTask(x.task?.task_id)}>Approve</Button>
                </Card.Body>
              </Card>
            )
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={requestTaskHandleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      </div>
    )
}

export default Task;