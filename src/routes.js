import React from "react";
import {HashRouter, Switch, Route} from "react-router-dom";
import Auth from "./components/auth/Auth";

export default(
    <HashRouter>
        <div>
            <Switch>
                <Route exact path="/" component={Auth}/>
            </Switch>
        </div>
    </HashRouter>
)