import Card from 'react-bootstrap/Card';
import '../organism/layout.css'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function ProjectExample() {
    const percentage = 66;
    const [lgShow, setLgShow] = useState(false);
    const [data, setData] = useState([]);
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
    const [status, setStatus] = useState(false);
    const projectApprovalOptions = ["Approved", "Pending", "Rejected"];
    const projectStatusOptions = ["Not Started", "Ongoing", "Done", "Bug"];
    const [selectedProject, setSelectedProject] = useState(null);

    const handleClose = () => {
        setLgShow(false);
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


    }, [status]);

    
    
    const onSubmit = () => {
        handleClose();

        let data = {
            "project_id": id,
            "name": name,
            "description": description,
            "start_date": startDate,
            "due_date": dueDate,
            "project_approval_status": approvalStatus,
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
        }).then((response) => {
            if (response.data.status === 200) {
                setStatus(true);
                fetchProject(); 
            }
        }).catch((error) => {
            console.log("Error posting data:", error);
        }).finally(() => {
            setStatus(false);
        });
    }

    const fetchProject = () => {
        axios.get("http://localhost:8088/api/project")
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const edit = (project) => {
        setSelectedProject(project);
        setId(project.project_id);
        setName(project.name);
        setDescription(project.description);
        setStartDate(project.start_date);
        setDueDate(project.due_date);
        setApprovalStatus(project.project_approval_status);
        setApprovalDate(project.approval_date);
        setProjectStatus(project.project_status);
        setSelectedTeamId(project.team_id);
        handleShow();
    }

    const Delete = (id) => {
        axios({
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            url: `http://localhost:8088/api/project/${id}`,
        }).then((response) => {
            if (response.data.status === 200) {
                setStatus(true);
                fetchProject(); 
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className='p-5 bg-light'>
            <div className="container-fluid">
                <div className="col-3 mb-2">
                    <Button onClick={() => setLgShow(true)}>Add Project</Button>
                </div> 

                {data.map(project => (
                <Card key={project.project_id} className="mb-3">
            <Card.Body>
            <Row>
                <Col xs lg="2">
                <div className='task' style={{borderRadius: '15px'}}>
                <div>
                    <h2>234</h2>
                    <p>Total Task</p> 
                </div>
                </div>

                <div className='task' style={{borderRadius: '15px'}}>
                <div>
                    <h2>234</h2>
                    <p>Total Task</p> 
                </div>
                </div>


                </Col>
                <Col xs lg="2">
                <div className='task' style={{borderRadius: '15px'}}>
                <div>
                    <h2>234</h2>
                    <p>Completed Task</p>
                </div>
                </div>

                <div className='task' style={{borderRadius: '15px'}}>
                <div>
                    <h2>234</h2>
                    <p>Completed Task</p>
                </div>
                </div>
                </Col>

                <Col md={{ span: 3, offset: 1 }}>
                <h2> {project.name}
                </h2>
                
                </Col>

                <Col md={{ span: 2, offset: 1 }}>
                <div style={{ width: 200, height: 200 }}>
                     <CircularProgressbar value={percentage} text={`${percentage}%`}  />
                </div>
                </Col>
          
            </Row>

            </Card.Body>
        </Card>
          ))}
                
                <Modal
                    size="lg"
                    show={lgShow}
                    onHide={() => setLgShow(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Add New Project
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                        <Form.Group className="mb-3" controlId="id">
        <Form.Label>ID</Form.Label>
        <Form.Control type="text" name="project_id" value={id} onChange={e=> setId(e.target.value)}/>
        </Form.Group>

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
        <Form.Control type="date" name="start_date" placeholder="Start date" value={startDate} onChange={e=> setStartDate(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="dueDate">
        <Form.Label>Due Date</Form.Label>
        <Form.Control type="date" name="dueDate" placeholder="Due date" value={dueDate} onChange={e=> setDueDate(e.target.value)}  />
      </Form.Group>

<Form.Select aria-label="Default select example" value={approvalStatus} onChange={e => setApprovalStatus(e.target.value)}>
<Form.Label>Project Approval Status</Form.Label>
    <option>Select Status</option>
    {projectApprovalOptions.map(option => (
        <option key={option} value={option}>
            {option}
        </option>
    ))}
</Form.Select>


      <Form.Group className="mb-3" controlId="approvalDate">
        <Form.Label>Project Approval Date</Form.Label>
            <Form.Control type="date" name="approvalDate" placeholder="Approval date" value={approvalDate} onChange={e=> setApprovalDate(e.target.value)}/>
      </Form.Group>

      <Form.Select aria-label="Default select example" value={projectStatus} onChange={e => setProjectStatus(e.target.value)}>
        <Form.Label>Project Approval Status</Form.Label>
            <option>Select Status</option>
            {projectStatusOptions.map(option => (
            <option key={option} value={option}>
            {option}
            </option>
    ))}
</Form.Select>
        
        <Form.Group className="mb-3" controlId="team">
    <Form.Label>Team</Form.Label>
    <Form.Select
        aria-label="Default select example"
        value={selectedTeamId}
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

{console.log(selectedTeamId)}




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

export default ProjectExample;