import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import "./ColorPage.css";

class ColorPage extends Component{

    constructor(){
        super();
        this.state = {
            username: "",
            password: ""
        }
    }



    render(){
        let {username, password} = this.state;
        let {user} = this.props;
        
        let matchRandColor = this.props.match.params.randCol;

        //Check if user is logged in
        if(!user.loggedIn) return <Redirect to="/login" />



        return(

            <div >
            <div className="MainColorBlock" style={{backgroundColor: `${matchRandColor}`}}>

            </div>
            <Link to="/">Main Dashboard</Link>
            </div>
        );
    };
}

function mapStateToProps(state){
    return {user: state.user};
}

export default connect(mapStateToProps, {})(ColorPage);