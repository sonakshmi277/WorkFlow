import React,{useState} from "react";
import axios from 'axios';
import "./common.css";
import {useNavigate} from "react-router-dom"
export default function SignUp(){
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email,setEmail]=useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/users", {
                userName,
                email,
                password
            });
            console.log("Signup Success:", response.data);
        } catch (error) {
            console.error("Signup Error:", error.response ? error.response.data : error);
        }
    };
return(
    <div className="mainLogin_det">
        <div className="basic_info">
            <h1>Create Account</h1>
        </div>
        <div className="boxes">
            <div className="user">
                <input 
                    type="username"
                    id="userName"
                    value={userName}
                    placeholder="Username"
                    onChange={(e) => setUserName(e.target.value)}
                />
            </div>
            <div className="pass">
                <input 
                    type="email"
                    id="email"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
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
                <button style={{backgroundColor:"#FF7F50",color:"#3E2C26",fontWeight:"bold",cursor: "pointer"} }onClick={handleSubmit}>SIGN UP</button>
            </div>
        </div>

    </div>
)
}