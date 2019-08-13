import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../redux/userReducer.js";
import { Redirect, Link } from "react-router-dom";

class Login extends Component{

    constructor(){
        super();
        this.state = {
            username: "",
            password: "",
            randomColor: ""
        }
    }

    handleChange = (event) =>{
        let {name, value} = event.target;
        this.setState({[name]: value});
    };

    loginUser = () => {
        let {username, password} = this.state;

        //Select random color to showcase this.props.match functionality
        let randColorVal = Math.floor(Math.random() * Math.floor(3));
        let randColor = "";
        switch(randColorVal){
            case 0:
                randColor = "red";
                this.setState({randomColor: randColor})
                return this.props.login(username, password);
            case 1:
                randColor = "blue";
                this.setState({randomColor: randColor})
                return this.props.login(username, password);
            case 2:
                randColor = "green";
                this.setState({randomColor: randColor})
                return this.props.login(username, password);
            default:
                randColor = "black";
                this.setState({randomColor: randColor})
                return this.props.login(username, password);
        }

        
    }

    render(){
        let {username, password} = this.state;
        let {user} = this.props;


        //Check if user is logged in
        if(user.loggedIn){
            return <Redirect to={`/color/${this.state.randomColor}`} />
        } 

        return(

            <div >
               <input type="text" value={username} name="username" onChange={this.handleChange}/>
            <input type="password" value={password} name="password" onChange={this.handleChange}/>
            <button onClick={this.loginUser}>Login</button>
            <Link to="/signup">Sign Up</Link>
            </div>
        );
    };
}

function mapStateToProps(state){
    return {user: state.user};
}

export default connect(mapStateToProps, {login})(Login);