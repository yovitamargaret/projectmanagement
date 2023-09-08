import Card from 'react-bootstrap/Card';
import 'react-circular-progressbar/dist/styles.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Badge from 'react-bootstrap/Badge';
import moment from 'moment';
import "./layout.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import ProgressBarComponent from '../../organism/progressbar';


function Project() {
    const percentage = 66;
    const now = 60;
    const [lgShow, setLgShow] = useState(false);
    const [data, setData] = useState([]);
    const [dataTask, setDataTask] = useState([{}]);
    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [approvalStatus, setApprovalStatus] = useState("");
    const [approvalDate, setApprovalDate] = useState("");
    const [projectStatus, setProjectStatus] = useState("");
    const [teams, setTeams] = useState([]);
    const [selectedTeamId, setSelectedTeamId] = useState(0);
    const [editProjectId, setEditProjectId] = useState(0);
    const [status, setStatus] = useState(false);
    const projectApprovalOptions = ["Approved", "Pending", "Rejected"];
    const projectStatusOptions = ["Not Started", "Ongoing", "Done", "Bug"];
    const [selectedProject, setSelectedProject] = useState(0);
    const [taskPercentage, setTaskPercentage] = useState(0);

    const startdate = moment(data.startDate).format("MMMM DD,yyyy");

    let date= (due_date)=>{
        const now = new Date();
        let end_date = new Date(due_date)
        const oneDay = (1000*60*60*24);
        let result = Math.round(Math.abs((end_date - now)/ oneDay));
        return result;
    }

    const enddate = moment(data.startDate).format("MMMM DD,yyyy");

    console.log(startDate);



    const handleClose = () => {
        setLgShow(false);
        setId(0);
        setName("");
        setDescription("");
        setStartDate("");
        setDueDate("");
        setApprovalStatus("");
        setApprovalDate("");
        setProjectStatus("");
        setSelectedTeamId(0);
        setSelectedProject(null);
    }

    const handleShow = () => setLgShow(true);

    useEffect(() => {
        axios({
            method: "GET",
            url: "http://localhost:8088/api/project"
        }).then((response) => {
            setData(response.data.data);
        }).catch((error) => {
            console.log(error);
        });

        axios({
            method: "GET",
            url: "http://localhost:8088/api/team"
        }).then((response) => {
            console.log(response.data);
            setTeams(response.data.data); 
            console.log(teams)
        }).catch((error) => {
            console.log(error);
        });
        axios({
            method: "Get",
            headers: {
                'Content-Type': 'application/json',
            },
            url: "http://localhost:8088/api/task_detail",
        }). then((response)=>{
            if(response.data.status === 200){
                setDataTask(response.data.data)
            }
        }).catch((error)=> {
            console.log(error)
        })
    }, [status]);

    
    
    const onSubmit = () => {
        handleClose();

        let data = {
            "project_id": id,
            "name": name,
            "description": description,
            "start_date": startDate,
            "due_date": dueDate,
            "project_approval_status": "Pending",
            "approval_date": approvalDate,
            "project_status": projectStatus,
            "team": {
                "team_id": selectedTeamId
            }
        }

       


        console.log(data);
        console.log("Selected Team ID:", selectedTeamId);

        axios({
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            url: "http://localhost:8088/api/project",
            data: JSON.stringify(data)
        }). then((response)=>{
            if(response.data.status === 200){
                setStatus(!status)
            }
        }).catch((error)=> {
            console.log(error)
        })
      
    }


    const edit = (project) => {
        setSelectedProject(project);
        setEditProjectId(project.project_id);
        setId(project.project_id);
        setName(project.name);
        setDescription(project.description);
        const selectedStartDate = new Date(project.start_date);
        const formattedStartDate = `${selectedStartDate.getFullYear()}-${(selectedStartDate.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${selectedStartDate.getDate().toString().padStart(2, '0')}`;
        setStartDate(formattedStartDate)
        const selectedDueDate = new Date(project.due_date);
        const formattedDueDate = `${selectedDueDate.getFullYear()}-${(selectedDueDate.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${selectedDueDate.getDate().toString().padStart(2, '0')}`;
        setDueDate(formattedDueDate);
        setApprovalStatus(project.project_approval_status);
        setApprovalDate(project.approval_date);
        const selectedApprovalDate = new Date(project.approval_date);
        const formattedApprovalDate = `${selectedApprovalDate.getFullYear()}-${(selectedApprovalDate.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${selectedApprovalDate.getDate().toString().padStart(2, '0')}`;
        setApprovalDate(formattedApprovalDate);
        setProjectStatus(project.project_status);
        setSelectedTeamId(project.team.team_id);
        handleShow();
    }
    
    let progressBar=(project)=>{
        let done=dataTask.filter(x=>x.task_status==="Done" && x.task?.project?.project_id===project).length
        let all=dataTask.filter(x=>x.task?.project?.project_id===project).length
        let result = (done/all)*100
        return result
    }

    return (
        <div className='p-5 bg-light'>
            <div className="container-fluid">
                <div className="col-3 mb-2">
                    <Button onClick={() => setLgShow(true)}>Add Project</Button>
                </div> 

                {data.length > 0 && data.map(project => (
                <Card key={project.project_id} className="mb-3">
            <Card.Body>
            <Row>

                <Col>
                <div className='task' style={{borderRadius: '15px'}}>
                <div>
                <Row>
                    <Col ><p>{startdate}</p></Col>
                     <Col>
                        <div className="detail">
                        <Link to={project.project_approval_status ==="Approved" ? `task/${project.project_id}`: `#`}>See Detail</Link>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col ><p style={{ fontSize: '18px', fontWeight: 'bold' }}>{project.name} <span ></span><FontAwesomeIcon icon={faPen} style={{ fontSize: '15px' }} onClick={() => edit(project)}/></p></Col>
                     
                </Row>
                    
                    
                   
                    <p>Team : {project.team.name}</p>  
                    <p>Project Approval : {project.project_approval_status}</p>                 
                    <p>{project.project_status}</p>
                    <div>                        
                    </div>
                    <Row>
                    <Col ><ProgressBar now={progressBar(project.project_id)} label={`${progressBar(project.project_id)}%`} visuallyHidden /></Col>
                     <Col>
                        <div className="time">
                        <Badge bg="secondary">{date(project.due_date)} Days more</Badge>
                        </div>
                    </Col>
                </Row>
                </div>
                </div>



                </Col>
                
            </Row>

            </Card.Body>
        </Card>
          ))}
                
                <Modal
                    size="lg"
                    show={lgShow}
                    onHide={handleClose}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                        {editProjectId ? "Edit Project" : "Add New Project"}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>

        <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name="name" value={name} onChange={e=> setName(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" name="description" value={description} onChange={e=> setDescription(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="startDate">
      <Form.Label>Start Date</Form.Label>
      <Form.Control type="date" name="start_date" placeholder="Start date" value={startDate} onChange={e=> {
         const selectedStartDate = new Date(e.target.value);
         const formattedStartDate = `${selectedStartDate.getFullYear()}-${(selectedStartDate.getMonth() + 1)
             .toString()
             .padStart(2, '0')}-${selectedStartDate.getDate().toString().padStart(2, '0')}`;
         setStartDate(formattedStartDate);
      }} />
      </Form.Group>

     <Form.Group className="mb-3" controlId="dueDate">
     <Form.Label>Due Date</Form.Label>
     <Form.Control type="date" name="dueDate" placeholder="Due date" value={dueDate} onChange={e=> {
            const selectedDate = new Date(e.target.value);
            const formattedDate = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1)
                .toString()
                .padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`;
            setDueDate(formattedDate);
            
     }}  />
     </Form.Group>

    <Form.Group className="mb-3" controlId="approvalStatus">
    <Form.Label>Project Approval Status</Form.Label>
    <Form.Select aria-label="Default select example" value={approvalStatus} onChange={e => setApprovalStatus(e.target.value)}>
        <option>Select Status</option>
        {projectApprovalOptions.map(option => (
        <option key={option} value={option}>
            {option}
        </option>
        ))}
    </Form.Select>
    </Form.Group>


      {/* <Form.Group className="mb-3" controlId="approvalDate">
        <Form.Label>Project Approval Date</Form.Label>
            <Form.Control type="date" name="approvalDate" placeholder="Approval date" value={approvalDate} onChange={e=> {
                       const selectedApprovalDate = new Date(e.target.value);
                       const formattedApprovalDate = `${selectedApprovalDate.getFullYear()}-${(selectedApprovalDate.getMonth() + 1)
                           .toString()
                           .padStart(2, '0')}-${selectedApprovalDate.getDate().toString().padStart(2, '0')}`;
                       setApprovalDate(formattedApprovalDate);
            }}/>
      </Form.Group> */}

    <Form.Group className="mb-3" controlId="projectStatus">
    <Form.Label>Project Status</Form.Label>
      <Form.Select aria-label="Default select example" value={projectStatus} onChange={e => setProjectStatus(e.target.value)}>
            <option>Select Status</option>
            {projectStatusOptions.map(option => (
            <option key={option} value={option}>
            {option}
            </option>
    ))}
    </Form.Select>
    </Form.Group>
        
        <Form.Group className="mb-3" controlId="team">
    <Form.Label>Team</Form.Label>
    <Form.Select
        aria-label="Default select example"
        value={selectedTeamId || (selectedProject && selectedProject.team_id)}
        onChange={e => setSelectedTeamId(parseInt(e.target.value))}
    >
        <option value="">Select Team</option>
        {teams.map(team => (
            <option key={team.team_id} value={team.team_id}>
                {team.name}
            </option>
        ))}
    </Form.Select>
</Form.Group>




                            <Button variant="primary" onClick={onSubmit}>
                                Submit
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
}

export default Project;