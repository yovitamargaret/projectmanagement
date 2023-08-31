
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import axios from "axios"
import React, { useState, useEffect, Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class RequestedTaskModal extends Component{
    
    render(){
        const approveTask=(task_id)=>{
      
        }
        const rejectTask=(task_id)=>{
    
        }
        return(
            <div>
            <Modal show={this.props.showRequestedTask} onHide={requestTaskHandleClose} size="lg">
            <Modal.Header closeButton>
            <Modal.Title>Requested Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {this.props.dataRequestTask.filter(x=> x.task.task_approval_status ==="Pending"&& x.task.project.project_id ===2).map(x=>{
            // {console.log(x)}
                return(
                    <Card>
                    <Card.Body>
                    <Card.Title>{x.task.name}</Card.Title>
                        <br/>
                    <Card.Text>
                        {x.task.description}
                        <br/>
                        Start Date : {x.task.start_date}
                        <br/>
                        Due Date : {x.task.due_date}
                        <br/>
                        Assigned Employee : {x.employee.name}
                    </Card.Text>
                        <Button variant="danger" onclick={rejectTask(x.task.task_id)}>Reject</Button>
                        <Button className="float-right" variant="primary" onclick={approveTask(x.task.task_id)}>Approve</Button>
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
    };
}

export default RequestedTaskModal;