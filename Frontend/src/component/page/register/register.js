import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

let Register = () => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phone_number, setPhone_Number] = useState("");
    const [password, setPassword] = useState("");
    const [repeated_password, setRepeatedPassword] = useState("");
    const [status, setStatus] = useState(false);
    const [notification, setNotification] = useState("");

    const SubmitRegister = () => {
        if (name === "" || address === "" || email === "" || password === "" || repeated_password === ""){
            setNotification("Please fill out all informations.");
        }
        else if (password === repeated_password){
            let data = {
                "name": name,
                "address": address,
                "email": email,
                "phone_number": phone_number,
                "password": password
            }
    
            axios({
                method :"POST",
                headers: {
                    'Content-Type' : 'application/json',
                },
                url: "http://localhost:8088/api/user/register",
                data:JSON.stringify(data)
            }).then((response)=>{
                if(response.data.status === 200){
                    setStatus(!status)
                    console.log("Register success!")
                    window.location.href = "/login";
                }
            }).catch((error)=> {
                console.log(error)
            })
        }
        else {
            setNotification("Passwords didn't match.")
        }
    }

    return(
        <>
            <button><Link to={"/login"}>Cancel</Link></button><br></br>
            <table>
                <tr>
                    <td>Name</td>
                    <td><input type="text" id="name" name="name" value={name} onChange={e=> setName(e.target.value)} /></td>
                </tr>
                <tr>
                    <td>Address</td>
                    <td><input type="text" id="address" name="address" value={address} onChange={e=> setAddress(e.target.value)} /></td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td><input type="text" id="email" name="email" value={email} onChange={e=> setEmail(e.target.value)} /></td>
                </tr>
                <tr>
                    <td>Phone Number</td>
                    <td><input type="text" id="phone_number" name="phone_number" value={phone_number} onChange={e=> setPhone_Number(e.target.value)} /></td>
                </tr>
                <tr>
                    <td>Password</td>
                    <td><input type="password" id="password" name="password" value={password} onChange={e=> setPassword(e.target.value)} /></td>
                </tr>
                <tr>
                    <td>Repeat Password</td>
                    <td><input type="password" id="repeated_password" name="repeated_password" value={repeated_password} onChange={e=> setRepeatedPassword(e.target.value)} /></td>
                </tr>
            </table>
            <button onClick={() => SubmitRegister()}>Submit</button><br></br><br></br>
            <h1>{notification}</h1>
        </>
    )
}

export default Register;