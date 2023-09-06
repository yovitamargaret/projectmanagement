import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import moment from 'moment';

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
    const currentApprovalDate = moment().format("YYYY-MM-DDTHH:mm:ss.SSS");


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
            "approval_date": currentApprovalDate,
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
            "project_approval_status": "Rejected",
            "approval_date": null,
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

  const confirmApprove = (project_id) => {
    Swal.fire({
      title: 'Approve Project',
      text: 'Are you sure you want to approve this project?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, approve it!',
    }).then((result) => {
      if (result.isConfirmed) {
        approveProject(project_id);
      }
    });
  };

  const confirmReject = (project_id) => {
    Swal.fire({
      title: 'Reject Project',
      text: 'Are you sure you want to reject this project?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, reject it!',
    }).then((result) => {
      if (result.isConfirmed) {
        rejectedProject(project_id);
      }
    });
  };


  return (
    <div  className='p-5 bg-light'>
      <div className="container-fluid">
      <h3>Approval Projects</h3>
      {pendingProjects.map((project) => (
        <Card key={project.project_id} className="mb-3">
          <Card.Body>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <div className='d-flex gap-2'>
            <Button variant="success" onClick={() => confirmApprove(project.project_id)}>
              Approve
            </Button>
            <Button variant="danger" onClick={() => confirmReject(project.project_id)}>
              Reject
            </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
</div>

  );
}

export default ProjectApprovePage;
