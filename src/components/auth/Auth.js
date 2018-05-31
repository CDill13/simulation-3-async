import React from "react";
import logo from "./logo.png";
import "./auth.css";

export default function Auth(){
    return(
        <div className="authBackground">
        {/* {console.log("boop:", this)} */}
            <div className="authBox">
                <img className="heloLogo" alt="Helo Logo" src={logo}/>
                <h1>Helo</h1>
                <a href="http://localhost:4321/auth/">
                    <button className="loginButton">Login/Register</button>
                </a>
            </div>
        </div>
    )
}