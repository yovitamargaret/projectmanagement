import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios"
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


let Region = () =>{
    const [ data, setData] = useState([{}]);
    const [ id, setId] = useState(0);
    const [ name, setName] = useState("");
    const [ status, setStatus] = useState(false);
    const [show, setShow] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState(null);

    const handleClose = () =>{
        setShow(false);
        setSelectedRegion(null);
    } 
    const handleShow = () => setShow(true);

    useEffect(() =>{
    axios({
        method:"GET",
        url: "http://localhost:8088/api/region"
    }).then((response) => {
        setData(response.data.data)
        console.log()
    }).catch((error) => {
     console.log(error)
    })
    },[status])

    const onSubmit = () => {
        handleClose();

        let data = {
            "region_id": id,
            "name": name
        }

        axios({
            method :"POST",
            headers: {
                'Content-Type' : 'application/json',
            },
            url: "http://localhost:8088/api/region",
            data:JSON.stringify(data)
        }).then((response)=>{
            if(response.data.status === 200){
                setStatus(!status)
            }
        }).catch((error)=> {
            console.log(error)
        })
    }

    const edit = (region) =>{
        setSelectedRegion(region);
        setId(region.region_id);
        setName(region.name);
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
        url: `http://localhost:8088/api/region/${id}`,
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



    return(
        <div>
            <button onClick={handleShow}>CREATE</button>
            <table className='table'>
                <thead>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Action</th>
                </thead>
                <tbody>
                    {data.map(x=>{
                        return(
                            <tr key={x.region_id}>
                                <td>{x.region_id}</td>
                                <td>{x.name}</td>
                                <td><Button variant="secondary" onClick={()=> edit(x)}>Edit</Button>
                                <Button variant="secondary" onClick={()=>Delete(x.region_id)}>Delete</Button>
                                </td>
                                
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>{selectedRegion ? 'Edit Region' : 'Create Region'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <input id="id" name="region_id" placeholder="id" type="text" value={id} onChange={e=> setId(e.target.value)} />
        <input id="name" name="name" placeholder="name" type="text" value={name} onChange={e=> setName(e.target.value)}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onSubmit}>
          {selectedRegion ? 'Save Changes' : 'Create'}
          </Button>
        </Modal.Footer>
      </Modal>

        </div>
    )
}
export default Region;



