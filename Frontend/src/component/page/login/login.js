import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UseAuth from "../../../features/authentication/UseAuth";
import Button from 'react-bootstrap/Button';

let Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState(false);
    const navigate = useNavigate();

    const { setAuth } = UseAuth();
    setAuth("");

    const SubmitLogin = () => {
        let data = {
            "email": email,
            "password": password
        }

        axios({
            method :"POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            url: "http://localhost:8088/api/user/login",
            data:JSON.stringify(data)
        }).then((response) => {
            if(response.data.status === 200){
                setAuth(response.data.data);
                setStatus(!status);
                navigate("/");
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
                <tr>
                    <td>Password</td>
                    <td><input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} /></td>
                </tr>
            </table>
            <Button variant="primary" onClick={() => SubmitLogin()}>Login</Button>
            <Button variant="warning" onClick={() => navigate("/register")}>Register</Button><br></br>
            <Link to={"/forgotpassword"}>Forgot Password</Link>
        </>
    )
}

export default Login;