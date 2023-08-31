import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

let ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState(false);

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
                window.location.href = "/login";
                console.log();
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
            <button onClick={() => SendPasswordChangeRequest()}>Reset Password</button>
            <button><Link to={"/login"}>Cancel</Link></button>
        </>
    )
}

export default ForgotPassword;