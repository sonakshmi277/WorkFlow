import React from "react";
import "./common.css"
import {useNavigate} from 'react-router-dom';
export default function Firstpg(){
    const navigate=useNavigate();
    const goToLogin=()=>{
        navigate('/login');
    };
    const goToSignUp=()=>{
        navigate('/signup');
    };

return(
    <div className='main'>
        <div className='nav'>
            <div className="navKaNav">
                    <button style={{backgroundColor: "#6E5F57", color:"peachpuff"}} className="log"  onClick={goToLogin}>Sign In</button>
                    <button style={{backgroundColor:"#6E5F57",color:"peachpuff"}} className="signIn" onClick={goToSignUp}>Sign Up</button>
        </div>
            
        </div>
        <div className="info" style={{color:"#4A3F35"}}>
                <h1 className="writing1" >
                Organize Your Work, Track Your Success!
                </h1>
                <h4 className="writing2">
                    Make Every Task Count
                </h4>
        </div>

        
    </div>
)

}