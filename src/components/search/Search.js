import React, {Component} from "react";
import Header from "../header/Header";
import "./search.css";
import axios from "axios";

export default class Search extends Component{
    constructor(){
        super();
        this.state = {
            searchActive: false,
            searchBy: "",
            searchValue: "",
            activeUserId: "",
            pages: [],
            pageNum: 1,
            friendsList: [],
            allMembers: "",
            visibleMembers: []
        }
        this.getAllMembersFriendsExempt = this.getAllMembersFriendsExempt.bind(this);
        this.generatePages = this.generatePages.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    generatePages(arr){
        let genPages = [];
        let genVisible = [];
        let theThings = this.state.allMembers;
        for(let i = 1; i < ((arr.length) / 8) + 1; i++){
            genPages.push(i);
        }
        this.setState({
            pages: genPages
        });
        for(let i = this.state.pageNum * 8 - 1; i > (this.state.pageNum * 8 - 1) - 8; i--){
            if(theThings[i]){
                genVisible.push(theThings[i]);
            }
        }
        this.setState({
            visibleMembers: genVisible
        });
    }

    componentDidMount(){
        axios.get(`/api/me`).then(res => {
            console.log(`active user: ${res.data.id}`);
            this.setState({
                activeUserId: res.data.id
            }) &
            console.log("activeUserId:",res.data.id) &
            this.getAllMembersFriendsExempt(res.data.id)
        })
    }

    getAllMembersFriendsExempt(id){
        // let notFriends = []
        axios.get(`/api/getAllMembersFriendsExempt/${id}`).then(res =>
            {
                this.setState({
                    allMembers: res.data
                }) & 
                this.generatePages(res.data)
            })
        .catch(err => console.log(err));
    }

    handleSelect(value){
        this.setState({
            searchBy: value
        });
    }

    handleReset(){
        this.setState({
            searchActive: false,
            pageNum: 1
        }),
        this.getAllMembersFriendsExempt(this.state.activeUserId)
    }

    handleSearch(value){
        // console.log("searched with value of ", value)
        switch (this.state.searchBy){
            case "first_name":
                axios.get(`/api/getSearchStuff/${this.state.activeUserId}/first_name/${this.state.searchValue}`).then(res => this.setState({
                    searchActive: true,
                    allMembers: res.data
                }) &
                this.generatePages(res.data)
                ) 
                break;
            case "last_name":
                axios.get(`/api/getSearchStuff/${this.state.activeUserId}/last_name/${this.state.searchValue}`).then(res => this.setState({
                    searchActive: true,
                    allMembers: res.data
                }) &
                this.generatePages(res.data)
                );
                break;
            default:
                console.log("search switch statement went to default");
        } 
        //use searchby to search by the given value and reload the shit unless the value is an empty string, then setState searchby to an empty string and reaload the shit
    }

    handleInput(value){
        this.setState({
            searchValue: value
        });
    }

    changePage(page){
        this.setState({
            pageNum: page
        }),
        this.state.searchActive !== true ?
        this.getAllMembersFriendsExempt(this.state.activeUserId) :
        this.handleSearch(this.state.searchValue)
    }

    addFriend(id, page){
        axios.post(`/api/addFriend`, {
            activeUser: this.state.activeUserId,
            newFriend: id
        }).then(this.state.searchActive !== true ?
            this.getAllMembersFriendsExempt(this.state.activeUserId) :
            this.handleSearch(this.state.searchValue))
    }

    removeFriend(id, page){
        axios.delete(`/api/removeFriend/${this.state.activeUserId}/${id}`)
        .then(this.state.searchActive !== true ?
            this.getAllMembersFriendsExempt(this.state.activeUserId) :
            this.handleSearch(this.state.searchValue))
    }

    render(){
        console.log(this.state.searchActive)
        // console.log("visibleMembers: ",this.state.visibleMembers);
        // console.log("pages: ",this.state.pages);
        // console.log("pageNum: ",this.state.pageNum);
        // console.log("allMembers: ", this.state.allMembers);
        // let allTheThings = this.state.allMembers;
        // let friendsList = this.state.friendsList;
        return(
            <div className="notVisible">
                <Header taco={this.props.match.path}/>
                <div className="mainBackground">
                    <div className="actualContentContainer">
                        <div className="verticalSpace10px"></div>
                        <div className="bigSearchContainer">
                            <div className="searchUpper">
                                <select onChange={e => this.handleSelect(e.target.value)}>
                                    {/* sets value to filter search by */}
                                    <option selected="selected">Search by</option>
                                    <option value="first_name">First Name</option>
                                    <option value="last_name">Last Name</option>
                                </select>
                                <input onChange={(e) => this.handleInput(e.target.value)}/>
                                <button onClick={() => this.handleSearch(this.state.searchValue)} className="searchButton">Search</button>
                                <button onClick={this.handleReset} className="resetButton">Reset</button>
                            </div>
                            <div className="resultsContainer">
                                { this.state.visibleMembers.length === 0 ? <p>You don't deserve to have any friends</p> : this.state.visibleMembers.map(entry => {
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
                                        <div className="entryContainer">
                                            <img alt="shut up about the alt tag alrady!" src={entry.pic}/>
                                            <div className="entryNames">
                                                <b>{entry.Fname}</b>
                                                <b>{entry.Lname}</b>
                                            </div>
                                            <button className="removeFriendButton" onClick={() => this.removeFriend(entry.m_id)}>Unfriend</button>
                                        </div>
                                        }
                                    )}
                                <div className="results">
                                    {/* limit results to 8 per page */}
                                </div>
                                <div className="reultsPages">
                                    {/* min 1 page
                                        max infinite pages
                                        default to max with empty searchValue */}
                                </div>
                            </div>
                            <div className="invisiblePageContainer">
                                <div className="searchPagesContaier">
                                    {this.state.pages.map(p => <div key={p} onClick={() => this.changePage(p)} className={p === this.state.pageNum ? "currentPage" : "page"} >{p}</div>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}