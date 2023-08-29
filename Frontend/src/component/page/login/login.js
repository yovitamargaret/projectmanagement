import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

let Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState(false);

    const SubmitLogin = () => {
        let data = {
            "email": email,
            "password": password
        }

        axios({
            method :"POST",
            headers: {
                'Content-Type' : 'application/json',
            },
            url: "http://localhost:8088/api/user/login",
            data:JSON.stringify(data)
        }).then((response)=>{
            if(response.data.status === 200){
                setStatus(!status)
                console.log("Login Success!");
            }
            else{
                console.log("Login Failed!");
            }
        }).catch((error)=> {
            console.log(error)
        })
    }

    return(
        <>
            <button><Link to={"/register"}>Register</Link></button><br></br>
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
            <button onClick={() => SubmitLogin()}>Login</button><br></br>
        </>
    )
}

export default Login;