import React, {Component} from "react";
import Header from "../header/Header";
import "./dashboard.css";
import {Link} from "react-router-dom";
import axios from "axios";

export default class Dashboard extends Component{
    constructor(){
        super();
        this.state = {
            sortValue: "",
            firstName: "",
            lastName: "",
            gender: "",
            hairColor: "",
            eyeColor: "",
            hobby: "",
            birthDay: "",
            birthMonth: "",
            birthYear: "",
            picture: "",
            id: "",
            filterValue: "",
            allMembers: "",
            userFriends: []
        }
        this.getAllMembersFriendsExempt = this.getAllMembersFriendsExempt.bind(this);
    }

    addFriend(id){
        axios.post(`/api/addFriend`, {
            activeUser: this.state.id,
            newFriend: id
        }).then(res => console.log(res.data)).then( this.state.filterValue === "" ? this.getAllMembersFriendsExempt(this.state.id) : this.getFilteredMembersAndFriendships(this.state.filterValue))
    }

    getFilteredMembersAndFriendships(value){
        this.setState({
            filterValue: value
        })
        switch (value){
            case "first_name":
                axios.get(`/api/getFilteredMembersAndFriendships/${this.state.id}/${this.state.firstName}/first_name`).then(res => this.setState({
                    allMembers: res.data
                }));
                break;
            case "last_name":
                axios.get(`/api/getFilteredMembersAndFriendships/${this.state.id}/${this.state.lastName}/last_name`).then(res => this.setState({
                    allMembers: res.data
                }));
                break;
            case "gender":
                axios.get(`/api/getFilteredMembersAndFriendships/${this.state.id}/${this.state.gender}/gender`).then(res => this.setState({
                    allMembers: res.data
                }));
                break;
            case "hair_color":
                axios.get(`/api/getFilteredMembersAndFriendships/${this.state.id}/${this.state.hairColor}/hair_color`).then(res => this.setState({
                    allMembers: res.data
                }));
                break;
            case "eye_color":
                axios.get(`/api/getFilteredMembersAndFriendships/${this.state.id}/${this.state.eyeColor}/eye_color`).then(res => this.setState({
                    allMembers: res.data
                }));
                break;
            case "hobby":
                axios.get(`/api/getFilteredMembersAndFriendships/${this.state.id}/${this.state.hobby}/hobby`).then(res => this.setState({
                    allMembers: res.data
                }));
                break;
            default:
                console.log("Dashboard.js switch statement: FIX THAT SHIT!!!");
        }
    }

    getAllMembersFriendsExempt(id){
        axios.get(`/api/getAllMembersFriendsExempt/${id}`).then(res => this.setState({
            allMembers: res.data
        }), console.log(`THE STUFF!!! ${this.state.allMembers}`))
        .catch(err => console.log(err));
    }

    componentDidMount(){
        axios.get(`/api/me`).then(res => {
            console.log(res.data);
            this.setState({
                id: res.data.id,
                firstName: res.data.first_name,
                lastName: res.data.last_name,
                gender: res.data.gender,
                hairColor: res.data.hair_color,
                eyeColor: res.data.eye_color,
                hobby: res.data.hobby,
                birthDay: res.data.birth_day,
                birthMonth: res.data.birth_month,
                birthYear: res.data.birth_year,
                picture: res.data.picture
            })
            console.log("IDIDIDIDID",res.data.id),
            this.getAllMembersFriendsExempt(res.data.id)
        })
    }

    render(){       
        return(
            <div className="notVisible">
                <Header taco={this.props.match.path}/>
                <div className="mainBackground">
                    <div className="actualContentContainer">
                        <div className="dashboardUpper">
                            <div className="dashboardProfile">
                                <img className="userProfileImage" alt="profile" src={this.state.picture}/>
                                <div className="userNameAndEdit">
                                    <b>{this.state.firstName}</b>
                                    <b>{this.state.lastName}</b>
                                    <button ><Link className="Link" to={{pathname: "/profile"}}>Edit Profile</Link></button>
                                </div>
                            </div>
                            <div className="horizontalSpace20px"></div>
                            <div className="welcomeTextBox">
                            <p>Welcome to Helo! Find reccomended friends based on your simillarties, and even search for them by name. The more you update your profile, the better recommendations we can make!</p>
                            </div>
                        </div>
                        <div className="recomendedContainer">
                            <div className="upperRecomended">
                                <p>Recommended Friends</p>
                                <div className="upperRecomended">
                                    <p>Filter by: &nbsp;</p>
                                    <select onChange={(e) => this.getFilteredMembersAndFriendships(e.target.value)}>
                                        <option selected="selected" >Select One</option>
                                        <option value="first_name">First Name</option>
                                        <option value="last_name">Last Name</option>
                                        <option value="gender">Gender</option>
                                        <option value="hair_color">Hair Color</option>
                                        <option value="eye_color">Eye Color</option>
                                        <option value="hobby">Hobby</option>
                                    </select>
                                </div>
                            </div>
                            <div className="recomandationsContainer">
                                <div className="reccomendations">
                                    { this.state.allMembers.length === 0 ? <p>You don't deserve to have any friends</p> : this.state.allMembers.map(entry => {
                                        return !entry.friendStatus
                                        ?
                                        <div className="entryContainer">
                                            <img alt="shut up about the alt tag alrady!" src={entry.pic}/>
                                            <div className="entryNames">
                                                <b>{entry.Fname}</b>
                                                <b>{entry.Lname}</b>
                                            </div>
                                            <button className="addFriendButton" onClick={() => this.addFriend(entry.m_id)}>Add Friend</button>
                                        </div>
                                        :
                                        console.log("friend removed")
                                        }
                                    )}
                                </div>
                            </div>
                        </div>           
                    </div>
                </div>
            </div>
        )
    }
}