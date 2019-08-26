import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import "./ColorPage.css";
import oldStore, {UPDATE_HEADER, UPDATE_PARAGRAPH} from "../redux/oldStore.js";

class ColorPage extends Component{

    constructor(props){
        super(props);
        const reduxState = oldStore.getState();
        this.state = {
            username: "",
            password: "",
            headerToDisplay: reduxState.headerToDisplay,
            paragraphToDisplay: reduxState.paragraphToDisplay,
            headerInput: "",
            paragraphInput: ""
        }
    }

    componentDidMount(){
        oldStore.subscribe(() => {
            const reduxState = oldStore.getState();
            this.setState({
                headerToDisplay: reduxState.headerToDisplay,
                paragraphToDisplay: reduxState.paragraphToDisplay
            });
        });
    };

    handleChange = (event) =>{
        let {name, value} = event.target;
        this.setState({[name]: value});
    };

    updateButtonClick = () => {
        this.updateHeader();
        this.updateParagraph();
    }
    updateHeader(){
        oldStore.dispatch({
            type: UPDATE_HEADER,
            payload: this.state.headerInput
        });
        this.setState({headerInput: ""});
    };
    updateParagraph(){
        oldStore.dispatch({
            type: UPDATE_PARAGRAPH,
            payload: this.state.paragraphInput
        });
        this.setState({paragraphInput: ""});
    };

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
            <h1>{this.state.headerToDisplay}</h1>
            <p>{this.state.paragraphToDisplay}</p>
            <p>Header input: {this.state.headerInput}</p> 
            <input
            name="headerInput"
            placeholder="Change the Header"
            value={this.state.headerInput}
            onChange={this.handleChange}
            />
                        <input
            name="paragraphInput"
            placeholder="Change the Paragraph"
            value={this.state.paragraphInput}
            onChange={this.handleChange}
            />
            <button onClick={this.updateButtonClick}>Submit Changes</button>
            <Link to="/">Main Dashboard</Link>
            </div>
        );
    };
}

function mapStateToProps(state){
    return {user: state.user};
}

export default connect(mapStateToProps, {})(ColorPage);