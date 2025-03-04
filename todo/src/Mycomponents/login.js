import React,{useState} from "react";
import "./common.css";
import axios from "axios"; 
import {useNavigate} from "react-router-dom"
export default function Login(){
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/login_det", {
                userName,
                password
            });
            console.log("Signin Success:", response.data);
            if(response.data==="Success"){
                navigate('/dashboard',{ state: { userName } })
            }else{
                alert(response.data);
            }
        } catch (error) {
            console.error("Signin Error:", error.response ? error.response.data : error);
        }
    };
return(
    <div className="mainLogin_det">
        <div className="basic_info">
            <h1>Welcome back!</h1>
            <h3>Sign in to your account</h3>
        </div>
        <div className="boxes">
            <div className="user">
                <input 
                    type="text"
                    id="userName"
                    value={userName}
                    placeholder="Username"
                    onChange={(e) => setUserName(e.target.value)}
                />
            </div>
            <div className="pass">
                <input 
                    type="password"
                    id="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="buttonlog">
                <button onClick={handleSubmit} style={{backgroundColor:"#FF7F50",color:"#3E2C26",fontWeight:"bold",cursor: "pointer"} }>LOGIN</button>
            </div>
        </div>

    </div>
)
}