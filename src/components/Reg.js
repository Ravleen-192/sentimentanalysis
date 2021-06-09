/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {Col, Row ,Form} from 'reactstrap';

import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { Auth } from "aws-amplify";
import { showError } from '../App';
var validator = require("email-validator");

class Reg extends Component {
  constructor() {
    super();
    this.state = {
      isNextPage:false,isLastPage:false
    }
  }
  componentDidMount(){
    window.scrollTo(0,0);
  }
  

  handleSignUp(){
    const { username, email, password, phone_number,address,address2,city,st,zip } = this.props.inputs;
    this.props.setOnLoad(false);
   Auth.signUp({
      username,
      password,
      attributes: {
        email, // optional
        phone_number ,
        address,
        address2,st,zip
      },
      validationData: [] //optional
    })
      .then(data => console.log(data))
      .then(()=>{this.props.switchComponent("Verify");
        this.props.setOnLoad(true);
        this.props.clearInputs();
      }) // switches Sign Up to Verification
      .catch(err => {
        console.log(err);
        this.props.setOnLoad(true);
        switch (err.code) {
          case "UsernameExistsException":
          case "InvalidParameterException":
            this.setState({isNextPage:false,isLastPage:false});
            break;
          default:
            break;
        }
        if(err&&err.message){
          showError(err.message);
        }
      })
  };
  
  setOnClickSignUp(){
    const { username, email, password } = this.props.inputs;
    if(!username){
      showError("User Name Required");
      return
    }
    if(!email){
      showError("Email Required");
      return;
    }
    if(!validator.validate(email)){
      showError("Please enter valid email");
      return;
    }
    if(username !== email){
      showError("Username should be an email");
      return
    }
    if(!password){
      showError("Password Required");
      return;
    }
    if(password.length <6){
      showError("Password must have length greater than or equal to 6");
      return;
    }
    this.setState({isNextPage:true});
    showError(null);
    window.scrollTo(0,0);
  }
  setOnClickFinish(){
    const { phone_number,address,address2,city,st,zip } = this.props.inputs;
    if(!address){
      showError("Address Required");
      return;
    }
    if(!phone_number){
      showError("Phone number Required");
      return;
    }
    
    showError(null);
    window.scrollTo(0,0);
    this.handleSignUp();
  }
  setOnClickUpload(){
    showError(null);
    this.setState({isLastPage:false,isNextPage:false});
    window.scrollTo(0,0);
  }
  render() {
    let{isNextPage} = this.state;
    const { username, email, password, phone_number,address,address2,city,st,zip } = this.props.inputs;
    return (
      <section>
        {isNextPage?
        <Col className="infobg">
        
          <Col>
            <Col className="center mb_10">
              <h2 className="mt_50">A bit more info, please</h2>
              <h6 className="gradient-text">We just need to verfiy that you are a real person.</h6>
            </Col>
            <Row className="">
              <Col md={4} lg={4} xl={4}/>
              <Col md={4} lg={4} xl={4} sm={12}>
              
                <input onChange={(event)=>this.props.handleFormInput(event)} value={address} className="from-control input mb_25" name="address" autoComplete="off" type="text" placeholder="Address 1"></input>
                <input onChange={(event)=>this.props.handleFormInput(event)} value={address2} className="from-control input mb_25" name="address2" autoComplete="off" type="text" placeholder="Address 2"></input>
                <Row>
                  <Col md={6} lg={6} xl={6} sm={12}>
                    <input className="from-control city input mb_25" value={city}
                    name="city"  onChange={(event)=>this.props.handleFormInput(event)}
                    autoComplete="off" type="text" placeholder="City"></input>
                  </Col>
                  <Col md={3} lg={3} xl={3} sm={12}>
                    <input onChange={(event)=>this.props.handleFormInput(event)} value={st} className="from-control st input mb_25" name="st" autoComplete="off" type="text" placeholder="ST"></input>
                  </Col>
                  <Col md={3} lg={3} xl={3} sm={12}>
                    <input onChange={(event)=>this.props.handleFormInput(event)} value={zip} className="from-control zip input mb_25" name="zip" autoComplete="off" type="text" placeholder="Zip"></input>
                  </Col>
                </Row>
                <PhoneInput international defaultCountry="US" limitMaxLength onChange={(event)=>this.props.handleFormInput(event,"phone")} value={phone_number} className="input mb_25"name={"phone_number"} autoComplete="off" placeholder="Phone"/>
                <Col className="text-center">
                  <button className="frmbtn" onClick={()=>this.setOnClickFinish()}>SignUp</button>
                </Col>
              </Col>
              <Col md={4} lg={4} xl={4}/>
            </Row>
          </Col>
        </Col>
        :
        <div className="personalbg">
          <div className="personalfrm">
            <Col md={12} lg={12} xl={12} sm={12}>
              <Col md={6} lg={6} xl={6} sm={12}>
                <div className="txt-reg">
                  <h2>Tell us about you and tell others about us!</h2>
                </div>
              </Col>
              <Col md={6} lg={6} xl={6} sm={12}>
                <div className="input-reg">
                  <input onChange={(event)=>this.props.handleFormInput(event)} value={username} className="from-control input mb_25" name="username" autoComplete="off" type="text" placeholder="Email as username"></input>
                  <input onChange={(event)=>this.props.handleFormInput(event)} value={email} className="from-control input mb_25" name="email" autoComplete="off" type="email" placeholder="Email"></input>
                  <input onChange={(event)=>this.props.handleFormInput(event)} value={password} className="from-control input mb_25" name="password" autoComplete="off" type="password" placeholder="Password"></input>
                  <Col md={12} lg={12} xl={12} sm={12}>
                    <button style={{float:'right'}} className="frmbtn signup" onClick={()=>this.setOnClickSignUp()}>Sign Up</button>
                  </Col>
                </div>
              </Col>
            </Col>
          </div>
        </div>}
      </section>
    );
  }
}
export default Reg;