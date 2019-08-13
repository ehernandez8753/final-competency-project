import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard.js";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import ColorPage from "./components/ColorPage.js";

export default (
    <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/color/:randCol" component={ColorPage} />
    </Switch>
)
