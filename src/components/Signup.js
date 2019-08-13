import React, { Component } from "react";
import { connect } from "react-redux";
import { signup } from "../redux/userReducer.js";
import { Redirect, Link } from "react-router-dom";

class Signup extends Component{

    constructor(){
        super();
        this.state = {
            username: "",
            password: ""
        }
    }

    handleChange = (event) => {
        let { name, value } = event.target;
        this.setState({
            [name]: value
        })
    };

    signupUser = async () => {

        let { username, password} = this.state;
        await this.props.signup(username, password);

    }

    

    render(){

        let { username, password } = this.state;
        let {user} = this.props;

        if(user.loggedIn) return <Redirect to="/" />
        

        return(

        <div>
            <input type="text" value={username} name="username" onChange={this.handleChange}/>
            <input type="password" value={password} name="password" onChange={this.handleChange}/>
            <button onClick={this.signupUser}>Signup</button>
            <Link to="/login">Log In</Link>
        </div>
        )
    };

}

function mapStateToProps(state){
    return {user: state.user};
}

export default connect(mapStateToProps, {signup})(Signup);