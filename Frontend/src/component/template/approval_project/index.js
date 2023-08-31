import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

function ProjectApprovePage() {
  const [pendingProjects, setPendingProjects] = useState([]);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    fetchPendingProject()
  }, [status]);

  const fetchPendingProject = () =>{
    axios
    .get('http://localhost:8088/api/project')
    .then((response) => {
      const pendingProjects = response.data.data.filter(
        (project) => project.project_approval_status === 'Pending'
      );
      setPendingProjects(pendingProjects);
    })
    .catch((error) => {
      console.log(error);
    });
}

  let approveProject=(project_id)=>{
    axios({
      method:"GET",
      url:`http://localhost:8088/api/project/${project_id}`
    }).then((response)=>{
          let dataApprove={
            "project_id": response.data.data.project_id,
            "name": response.data.data.name,
            "description": response.data.data.description,
            "start_date": response.data.data.start_date,
            "due_date": response.data.data.due_date,
            "project_approval_status": "Approved",
            "approval_date": response.data.data.approval_date,
            "project_status": response.data.data.project_status,
            "team": {
                "team_id":  response.data.data.team.team_id
          }
        }
        
        axios({
          method:"POST",
          url:`http://localhost:8088/api/project`,
          headers: {
            'Content-Type' : 'application/json',
          },
          data:JSON.stringify(dataApprove),
        }).then((response)=>{
              setStatus(true)
            
        }).catch((eror)=>{
          console.log(eror)
        })
        
    })
    .catch((eror)=>{
      console.log(eror)
    })
  }

  let rejectedProject=(project_id)=>{
    console.log(project_id);
    axios({
      method:"GET",
      url:`http://localhost:8088/api/project/${project_id}`
    }).then((response)=>{
          let dataApprove={
            "project_id": response.data.data.project_id,
            "name": response.data.data.name,
            "description": response.data.data.description,
            "start_date": response.data.data.start_date,
            "due_date": response.data.data.due_date,
            "project_approval_status": "Approved",
            "approval_date": response.data.data.approval_date,
            "project_status": response.data.data.project_status,
            "team": {
                "team_id":  response.data.data.team.team_id
          }
          
        }
        
        axios({
          method:"POST",
          url:`http://localhost:8088/api/project/`,
          headers: {
            'Content-Type' : 'application/json',
          },
          data:JSON.stringify(dataApprove),
        }).then((response)=>{
              setStatus(true)
            
        }).catch((eror)=>{
          console.log(eror)
        })
        
    }).catch((eror)=>{
      console.log(eror)
    })
  }


  return (
    <div>
      <h1>Approve Projects</h1>
      {pendingProjects.map((project) => (
        <Card key={project.project_id}>
          <Card.Body>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <Button variant="success" onClick={() => approveProject(project.project_id)}>
              Approve
            </Button>
            <Button variant="danger" onClick={() => rejectedProject(project.project_id)}>
              Reject
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default ProjectApprovePage;
