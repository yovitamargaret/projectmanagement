import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import UserData from "../../../features/authentication/UserData";

let ChangePassword = () => {
    const [email, setEmail] = useState(UserData().email);
    const [newPassword, setNewPassword] = useState("");
    const [repeatNewPassword, setRepeatNewPassword] = useState("");
    const [notification, setNotification] = useState("");
    const [status, setStatus] = useState(false);
    const navigate = useNavigate();

    const SendPasswordChangeRequest = () => {
        if(newPassword === ""){
            setNotification("Please fill the new password");
        }
        else if(repeatNewPassword === ""){
            setNotification("Please repeat your new password");
        }
        else if (newPassword === repeatNewPassword){
            let data = {
                "email": email,
                // "current_password": "",
                "new_password": newPassword
            }
    
            axios({
                method :"POST",
                headers: {
                    'Content-Type' : 'application/json',
                },
                url: "http://localhost:8088/api/profile/changepassword",
                data:JSON.stringify(data)
            }).then((response) => {
                if(response.data.status === 200){
                    setStatus(!status)
                    navigate("/");
                }
            }).catch((error) => {
                console.log(error)
            })
        }
        else{
            setNotification("Password didn't match.");
        }
    }

    return(
        <>
            <table>
                <tr>
                    <td>New Password</td>
                    <td><input type="password" id="newPassword" name="newPassword" value={newPassword} onChange={e => setNewPassword(e.target.value)} /></td>
                </tr>
                <tr>
                    <td>Repeat New Password</td>
                    <td><input type="password" id="repeatPassword" name="repeatPassword" value={repeatNewPassword} onChange={e => setRepeatNewPassword(e.target.value)} /></td>
                </tr>
            </table>
            <Button variant="warning" onClick={() => SendPasswordChangeRequest()}>Change Password</Button>
            <h1>{notification}</h1>
        </>
    )
}

export default ChangePassword;