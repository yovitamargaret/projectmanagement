import axios from "axios"
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Select from "react-dropdown-select";

let Employee = () =>{
    const [data, setData] = useState([{}]);
    const [teamNameData, setTeamNameData] = useState([{}]);
    const [employee_id, setEmployeeId] = useState(0);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [team, setTeam] = useState({});
    const [team_id, setTeamId] = useState(0);
    const [status, setStatus] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        axios({
            method:"GET",
            url: "http://localhost:8088/api/employee"
        }).then((response) => {
            setData(response.data.data)
        }).catch((error) => {
            console.log(error)
        })
    },[status])

    useEffect(() => {
        axios({
            method:"GET",
            url: "http://localhost:8088/api/teammodified"
        }).then((response) => {
            setTeamNameData(response.data.data)
        }).catch((error) => {
            console.log(error)
        })
    },[status])

    const onSubmit = () => {
        handleClose();

        let data;

        /*
            Kondisi 1: Dropdown Team Name tidak diapa-apakan
            team: null
            team.name: undefined/(Nama team yang dipilih)

            ERROR
            team[0].name

            Kondisi 2: Dropdown Team Name pilih Unassigned
            team: [object Object]
            team.name: undefined
            team[0].name: Unassigned

            Kondisi 3: Dropdown Team Name pilih Team selain Unassigned
            team= [object Object]
            team.name: undefined
            team[0].name: (Nama team yang dipilih)
        */

        // console.log("Entire team data: " + team)
        // console.log("Team No Index: " + team.name)
        // console.log("Team with Index: " + team[0].name)

        //Kondisi 1: Dropdown Team Name tidak diapa-apakan
        if(team === null || (team !== null && team.name !== undefined)){
            console.log("Kondisi 1")
            if(team_id === 0){
                data = {
                    "employee_id": employee_id,
                    "name": name,
                    "address": address,
                    "email": email,
                    "phone_number": phone_number,
                    "team": null
                }
            }
            else{
                data = {
                    "employee_id": employee_id,
                    "name": name,
                    "address": address,
                    "email": email,
                    "phone_number": phone_number,
                    "team": {
                        "team_id": teamNameData[team_id].team_id,
                        "name": teamNameData[team_id].name,
                        "team_member_number": teamNameData[team_id].team_member_number
                    }
                }
            }
        }
        //Kondisi 2: Dropdown Team Name pilih Unassigned
        else if(team[0].name === teamNameData[0].name){
            console.log("Kondisi 2")
            data = {
                "employee_id": employee_id,
                "name": name,
                "address": address,
                "email": email,
                "phone_number": phone_number,
                "team": null
            }
        }
        //Kondisi 3: Dropdown Team Name pilih Team selain Unassigned
        else{
            console.log("Kondisi 3")
            data = {
                "employee_id": employee_id,
                "name": name,
                "address": address,
                "email": email,
                "phone_number": phone_number,
                "team": {
                    "team_id": team[0].team_id,
                    "name": team[0].name,
                    "team_member_number": team[0].team_member_number
                }
            }
        }

        axios({
            method :"POST",
            headers: {
                'Content-Type' : 'application/json',
            },
            url: "http://localhost:8088/api/employee",
            data:JSON.stringify(data)
        }).then((response) => {
            if(response.data.status === 200){
                setStatus(!status)
            }
        }).catch((error) => {
            console.log(error)
        })
    }
        
    const Edit = (employee) => {
        setEmployeeId(employee.employee_id);
        setName(employee.name);
        setAddress(employee.address);
        setEmail(employee.email);
        setPhoneNumber(employee.phone_number);
        setTeam(employee.team);

        teamNameData.map((x, index) => {
            let tempData = {
                "object": x.name === teamNameData[0].name ? undefined : x.name,
                "index": index
            }

            if(tempData.object === employee.team?.name)
            {
                setTeamId(tempData.index);
                console.log("Team ID: " + team_id)
            }
        })
    
        handleShow();
    }
    
    const Delete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios({
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    url: `http://localhost:8088/api/employee/${id}`,
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
        });
    };
    
    return (
        <div>
            <table className='table'>
                <thead>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Team Name</th>
                    <th>Action</th>
                </thead>
                <tbody>
                    {data.map(x => {
                        return(
                            <tr key={x.employee_id}>
                                <td>{x.employee_id}</td>
                                <td>{x.name}</td>
                                <td>{x.address}</td>
                                <td>{x.email}</td>
                                <td>{x.phone_number}</td>
                                <td>{x.team?.name === undefined ? teamNameData[0].name : x.team?.name}</td>
                                <td>
                                    <Button variant="secondary" onClick={() => Edit(x)}>Edit</Button>
                                    <Button variant="danger" onClick={() => Delete(x.employee_id)}>Delete</Button>
                                </td> 
                            </tr>
                        )
                    })}
                </tbody>
            </table>
    
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input id="id" name="employee_id" placeholder="id" type="text" value={employee_id} onChange={e => setEmployeeId(e.target.value)} hidden/>
                    <table>
                        <tr>
                            <td>Employee Name</td>
                            <td><input id="name" name="name" placeholder="name" type="text" value={name} onChange={e => setName(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td><input id="address" name="address" placeholder="address" type="text" value={address} onChange={e => setAddress(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td><input id="email" name="email" placeholder="email" type="text" value={email} onChange={e => setEmail(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td>Phone Number</td>
                            <td><input id="phone_number" name="phone_number" placeholder="phone_number" type="text" value={phone_number} onChange={e => setPhoneNumber(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td>Team</td>
                            <td><Select options={teamNameData} labelField="name" valueField="team_id" values={[teamNameData[team_id]]} onChange={e => setTeam(e)} /></td>
                        </tr>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
        )
    }

export default Employee;