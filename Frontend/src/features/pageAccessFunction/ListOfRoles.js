import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const ListOfRoles = () => {
    const [data, setData] = useState([{}]);
    useEffect(() => {
        axios({
            method:"GET",
            url: "http://localhost:8088/api/role"
        }).then((response) => {
            setData(response.data.data)
        }).catch((error) => {
            console.log(error)
        })
    })
    
        return data
}

export default ListOfRoles