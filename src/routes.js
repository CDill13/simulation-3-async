import React from "react";
import {HashRouter, Switch, Route} from "react-router-dom";
// import Main from "./components/main/Main";
import Auth from "./components/auth/Auth";
import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/profile/Profile";
import Search from "./components/search/Search";

export default(
    <HashRouter>
        <div>
            <Switch>
                <Route exact path="/" component={Auth}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/search" component={Search}/>
            </Switch>
        </div>
    </HashRouter>
)