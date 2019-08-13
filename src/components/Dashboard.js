import React, { Component } from "react";
import { getUser, logout } from "../redux/userReducer.js";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";

class Dashboard extends Component{
    constructor(){
        super();
        this.state = {
            matchRandColor: ""
        }
    }

    componentDidMount(){

        this.props.getUser();
    }

    logout = async () => {
        await this.props.logout();
    }

    render(){

        let { user } = this.props;
        if(!user.loggedIn){
            return <Redirect to="/signup" />
        }


        return(
            <div>
                <h1>Successfully Logged In</h1>
                <button onClick={this.logout}>Log Out</button>
            </div>
        )
    };
}

function mapStateToProps(state){
    return { user: state.user}
  }

  export default connect(mapStateToProps, { getUser, logout })(Dashboard);