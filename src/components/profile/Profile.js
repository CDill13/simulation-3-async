import React, {Component} from "react";
import Header from "../header/Header";
import "./profile.css";
// import goose from "./civilGoose.png";
import axios from "axios";

export default class Profile extends Component{
    constructor(){
        super();
        this.state = {
            firstName: "",
            lastName: "",
            gender: "",
            hairColor: "",
            eyeColor: "",
            hobby: "",
            birthDay: null,
            birthMonth: "",
            birthYear: null,
            picture: "",
            id: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
    }

    getUserInfo(){
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
            picture: res.data.picture,
        })})
    }

    componentDidMount(){
        this.getUserInfo()
    }

    handleFirstName(value){
        this.setState({
            tempFirstName: value
        })
    }

    handleLastName(value){
        this.setState({
            tempLastName: value
        })
    }

    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name] : value
        })
    }

    updateProfile(){
        let profileUpdate = {
            id: this.state.id,
            first_name: this.state.tempFirstName,
            last_name: this.state.tempLastName,
            gender: this.state.gender,
            hair_color: this.state.hairColor,
            eye_color: this.state.eyeColor,
            hobby: this.state.hobby,
            birth_day: this.state.birthDay,
            birth_month: this.state.birthMonth,
            birth_year: this.state.birthYear,

        };
        console.log("profileUpdate sent:",profileUpdate);
        axios.put(`/api/updateProfile`, profileUpdate)
        .then(this.getUserInfo());
    }

    render(){
        let days = [];
        for(let i = 1; i <= 31; i++){
            days.push([i])
        }
        let years = [];
        for(let i = -4000; i <= 2250; i++){
            years.push([i])}
        console.log(this.props.match.path);
        console.log(
            "Fname:", this.state.tempFirstName,
            "Lname:", this.state.tempLastName,
            "gender:", this.state.gender,
            "hair:", this.state.hairColor,
            "eye:", this.state.eyeColor,
            "hobby:", this.state.hobby,
            "bDay:", this.state.birthDay,
            "bMonth:", this.state.birthMonth,
            "bYear:", this.state.birthYear
        );
        return(
            <div>
                <Header taco={this.props.match.path}/>
                <div className="mainBackground">
                    <div className="actualContentContainer">
                    <div className="verticalSpace10px"></div>                    
                        <div className="profileProfileContainer">
                            <div className="picAndNames">
                                <img alt="taco" className="userProfileImage" src={this.state.picture} /> 
                                <div className="names">
                                    <b>{this.state.firstName}</b>
                                    <b>{this.state.lastName}</b>
                                </div>
                            </div>
                            <div className="profileButtons">
                                <button onClick={this.updateProfile} className="updateButton">Update</button>
                                <button onClick={() => console.log("reset clicked")} className="cancelButton">Cancel</button>
                            </div>
                        </div>
                        <div className="verticalSpace10px"></div>
                        <div className="profileFormContainer">
                            <div className="profileForm">
                                First Name<input placeholder={this.state.firstName} type="text" name="firstName" onChange={e => this.handleFirstName(e.target.value)} />
                                Last Name<input placeholder={this.state.lastName} type="text" name="lastName" onChange={e => this.handleLastName(e.target.value)} />
                                Gender<select value={this.state.gender} name="gender" onChange={this.handleChange} >
                                    <option selected="selected">{this.state.gender}</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Undisclosed">Prefer not to share</option>
                                    <option value="DC Negative">DC Negative</option>
                                    <option value="DC Positive">DC Positive</option>
                                    <option value="Alternating Current">Alternating Current</option>
                                </select>
                                Hair Color<select value={this.state.hairColor} name="hairColor" onChange={this.handleChange}>
                                    <option selected="selected">{this.state.hairColor}</option>
                                    <option value="Brown">Brown</option>
                                    <option value="Black">Black</option>
                                    <option value="Red">Red</option>
                                    <option value="Blonde">Blonde</option>
                                    <option value="None">None</option>
                                    <option value="Painted hull">Painted Hull</option>
                                </select>
                                Eye Color<select value={this.state.eyeColor} name="eyeColor" onChange={this.handleChange} >
                                    <option selected="selected">{this.state.eyeColor}</option>
                                    <option value="Blue">Blue</option>
                                    <option value="Brown">Brown</option>
                                    <option value="Green">Green</option>
                                    <option value="Yellow">Yellow</option>
                                    <option value="Red">Red</option>
                                    <option value="Orange">Orange</option>
                                    <option value="Violet">Violet</option>
                                    <option value="Pink">Pink</option>
                                </select>
                            </div>
                            <div className="profileForm">  
                                Hobby<select value={this.state.hobby} name="hobby" onChange={this.handleChange}>
                                    <option selected="selected">{this.state.hobby}</option>
                                    <option value="Video Games">Video Games</option>
                                    <option value="Climbing">Climbing</option>
                                    <option value="Brewing">Brewing</option>
                                    <option value="Metal Working">Metal Working</option>
                                    <option value="Wood Working">Wood Working</option>
                                    <option value="Photography">Photography</option>
                                    <option value="Team Sports">Team Sports</option>
                                    <option value="Extreme Sports">Extreme Sports</option>
                                    <option value="Hunting and Fishing">Hunting and Fishing</option>
                                    <option value="Assimilation">Data Collection</option>
                                </select>
                                Birthday Day<select value={this.state.birthDay} name="birthDay" onChange={this.handleChange} >
                                    <option selected="selected">{this.state.birthDay}</option>
                                    {days.map(day => <option value={day}>{day}</option>)}
                                </select>
                                Birthday Month<select value={this.state.birthMonth} name="birthMonth" onChange={this.handleChange} >
                                    <option selected="selected">{this.state.birthMonth}</option>
                                    <option value="January">January</option>
                                    <option value="February">February</option>
                                    <option value="March">March</option>
                                    <option value="April">April</option>
                                    <option value="May">May</option>
                                    <option value="June">June</option>
                                    <option value="July">July</option>
                                    <option value="August">August</option>
                                    <option value="September">September</option>
                                    <option value="October">October</option>
                                    <option value="November">November</option>
                                    <option value="December">December</option>
                                </select>
                                Birthday Year<select value={this.state.birthYear} name="birthYear" onChange={this.handleChange} >
                                    <option selected="selected">{this.state.birthYear}</option>                                    
                                    {years.map(year => <option value={year}>{year}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}