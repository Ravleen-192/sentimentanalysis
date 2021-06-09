/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import homeimg from "../images/home.png";
import { Auth } from "aws-amplify";
import { showError } from '../App';
const divStyle = {
    backgroundposition: "50% 0",
    backgroundSize: "cover",
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height:'86vh',
    opacity:1,
    backgroundImage: `url(${homeimg})`,
  };
class Login extends Component {
    constructor() {
        super();
        this.state = {
           
        }
       
    }
    componentDidMount(){
        window.scrollTo(0,0);
    }
    
    handleSignIn = event => {
        event.preventDefault();
        const { username, password } = this.props.inputs;
        if(!username){
            showError("User name Required");
            return;
        }
        if(!password){
            showError("Password required");
            return;
        }
        this.props.setOnLoad(false);
        // You can pass an object which has the username, password and validationData which is sent to a PreAuthentication Lambda trigger
        Auth.signIn({ username, password })
          .then(user => {console.log("1",user);
                this.props.setUser(user);
            })
          .then(() => {
                this.props.switchComponent("MainGrid");
                this.props.setOnLoad(true);
                this.props.clearInputs();
            })
          .catch(err =>{
            if(err.code=="UserNotConfirmedException"){
                this.props.switchComponent("Verify")
            }else{
                if(err && err.message){
                    showError(err.message);
                }
            }
            this.props.setOnLoad(true);
            console.log("2",err);
          } 
        );
    };
    render() {
        const { username, password } = this.props.inputs;
        return (
            <section>
            <div className="personalbg">
                <div className="personalfrm">
                    <Col md={12} lg={12} xl={12} sm={12}>
                    <Col md={6} lg={6} xl={6} sm={12}>
                        <div className="txt-reg">
                        <h2>Great to have you back here!</h2>
                        </div>
                    </Col>
                    <Col md={6} lg={6} xl={6} sm={12}>
                        <div className="input-reg">
                            <input onChange={(event)=>this.props.handleFormInput(event)} name="username" value={username} className="from-control input mb_25" autoComplete="off" type="email" placeholder="Email"></input>
                            <input onChange={(event)=>this.props.handleFormInput(event)} name="password" value={password} className="from-control input mb_25" autoComplete="off" type="password" placeholder="Password"></input>
                            <Col md={12} lg={12} xl={12} sm={12}>
                                <button style={{float:'right'}}onClick={this.handleSignIn} className="frmbtn">Sign In</button>
                            </Col>
                        </div>
                    </Col>
                    </Col>
                </div>
            </div>
        </section>
        );
    }
}
export default Login;