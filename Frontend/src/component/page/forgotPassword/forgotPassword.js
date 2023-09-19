import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

let ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState(false);
    const navigate = useNavigate();

    const SendPasswordChangeRequest = () => {
        let data = {
            "email": email
        }

        axios({
            method :"POST",
            headers: {
                'Content-Type' : 'application/json',
            },
            url: "http://localhost:8088/api/user/forgot",
            data:JSON.stringify(data)
        }).then((response) => {
            if(response.data.status === 200){
                setStatus(!status)
                navigate("/login");
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    return(
        <>
            <table>
                <tr>
                    <td>Email</td>
                    <td><input type="text" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} /></td>
                </tr>
            </table>
            <Button variant="success" onClick={() => SendPasswordChangeRequest()}>Reset Password</Button>
            <Button variant="warning" onClick={() => navigate("/login")}>Cancel</Button>
        </>
    )
}

export default ForgotPassword;