import React, {Component} from "react";
import homeIcon from "./home.png";
import searchIcon from "./search.png";
import axios from "axios";
import {Link} from "react-router-dom";
import "./header.css";

export default class Header extends Component{
    // constructor(){
    //     super();
    //     this.state = {
    //         title: ""
    //     }
    // }
    render(){
        let title = "";
        let taco = this.props.taco;
        switch (taco){
            case "/profile":
                title = "Profile"
                break;
            case "/dashboard":
                title = "Dashboard"
                break;
            case "/search":
                title = "Search"
                break;
            default: console.log("no title");
        }
        // console.log(this.props)
        return(
            <div className="header">
                <div className="left">
                    <b>Helo</b>
                    <Link to={{pathname: "/dashboard"}}>
                        <img className="homeIcon" alt="homeIcon" src={homeIcon}/>
                    </Link>
                    <Link to={{pathname: "/search"}}>
                        <img className="searchIcon" alt="searchIcon" src={searchIcon}/>
                    </Link>
                </div>
                <div className="middle">
                    <p>{title}</p>
                </div>
                <div className="right">
                    <Link onClick={() => axios.get(`/auth/logout`)} className="logout" to={{pathname: "/"}}> <p>Logout</p> </Link>
                </div>
            </div>
        )
    }
}