import React, {Component} from "react";
import logo from "./logo.png";
import "./auth.css";

export default function Auth(){
    return(
        <div className="authBackground">
            <div className="authBox">
                <img className="heloLogo" alt="Helo Logo" src={logo}/>
                <h1>Helo</h1>
                <button className="loginButton">Login/Register</button>
            </div>
        </div>
    )
}